// RoomsTab.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import EditRoomForm from './EditRoomForm';

const RoomsTab = ({ refreshKey }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/rooms/getallrooms');
      setRooms(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [refreshKey]);

  const handleEdit = (room) => {
    setEditingRoom(room);
    setEditModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/rooms/rooms/${id}`);
      message.success('Room deleted successfully!');
      fetchRooms();  // Refresh the rooms list after deletion
    } catch (error) {
      message.error('Failed to delete room.');
    }
  };

  const columns = [
    {
      title: 'Room Name',
      dataIndex: 'roomName',
      key: 'roomName',
    },
    {
      title: 'Room Number',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Max Count',
      dataIndex: 'maxCount',
      key: 'maxCount',
    },
    {
      title: 'Rent Per Day',
      dataIndex: 'rentPerDay',
      key: 'rentPerDay',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Current Bookings',
      key: 'currentBookings',
      render: (text, record) => (
        <ul>
          {record.currentBookings.map((booking, index) => (
            <li key={index}>
              User: {booking.userId}, Start: {new Date(booking.startDate).toLocaleDateString()}, End: {new Date(booking.endDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
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
        </>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <p>Loading rooms...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table dataSource={rooms} columns={columns} rowKey="_id" />
      )}
      <EditRoomForm
        room={editingRoom}
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        refreshRooms={fetchRooms}  // Pass fetchRooms as refreshRooms prop
      />
    </div>
  );
};

export default RoomsTab;
