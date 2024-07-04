import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/users');
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/users/${id}`);
      message.success('User deleted successfully!');
      setUsers(users.filter(user => user._id !== id)); // Update the local state
    } catch (error) {
      message.error('Failed to delete user.');
    }
  };

  const showEditModal = (user) => {
    setSelectedUser(user);
    form.setFieldsValue({ role: user.role });
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`/api/users/users/${selectedUser._id}/role`, { role: values.role });
      message.success('User role updated successfully!');
      setUsers(users.map(user => user._id === selectedUser._id ? { ...user, role: values.role } : user));
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to update user role.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table dataSource={users} columns={columns} rowKey="_id" />
      )}

      <Modal
        title="Edit User Role"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="edit_user_role">
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select placeholder="Select a role">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
              <Option value="staff">Staff</Option>
              <Option value="superadmin">Superadmin</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersTab;
