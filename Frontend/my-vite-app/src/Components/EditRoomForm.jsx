// EditRoomForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Modal, message, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const EditRoomForm = ({ room, visible, onClose, refreshRooms }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (room) {
      form.setFieldsValue(room);
    }
  }, [room, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.put(`/api/rooms/rooms/${room._id}`, values);
      message.success('Room updated successfully!');
      onClose();
      refreshRooms();  // Refresh the rooms list after updating the room
    } catch (error) {
      message.error('Failed to update room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit Room"
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="roomName" label="Room Name" rules={[{ required: true, message: 'Please enter the room name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="roomNumber" label="Room Number" rules={[{ required: true, message: 'Please enter the room number' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="maxCount" label="Max Count" rules={[{ required: true, message: 'Please enter the max count' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="rentPerDay" label="Rent Per Day" rules={[{ required: true, message: 'Please enter the rent per day' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status' }]}>
          <Select>
            <Option value="booked">Booked</Option>
            <Option value="vacant">Vacant</Option>
            <Option value="maintenance">Maintenance</Option>
          </Select>
        </Form.Item>
        <Form.Item name="roomDescription" label="Room Description" rules={[{ required: true, message: 'Please enter the room description' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="imageUrls" label="Image URLs">
          <Select mode="tags" style={{ width: '100%' }} placeholder="Add image URLs">
            {room?.imageUrls?.map((url) => (
              <Option key={url}>{url}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="currentBookings" label="Current Bookings">
          <Select mode="tags" style={{ width: '100%' }} placeholder="Add current bookings">
            {room?.currentBookings?.map((booking) => (
              <Option key={booking}>{booking}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="floor" label="Floor" rules={[{ required: false, message: 'Please enter the floor' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="roomType" label="Room Type" rules={[{ required: false, message: 'Please enter the room type' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="services" label="Services">
          <Select mode="tags" style={{ width: '100%' }} placeholder="Add services">
            <Option value="food">Food</Option>
            <Option value="bath">Bath</Option>
            <Option value="snacks">Snacks</Option>
            <Option value="drinks">Drinks</Option>
          </Select>
        </Form.Item>
        <Form.Item name="utilities" label="Utilities">
          <Select mode="tags" style={{ width: '100%' }} placeholder="Add utilities">
            {room?.utilities?.map((utility) => (
              <Option key={utility}>{utility}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="staff" label="Staff">
          <Input />
        </Form.Item>
        <Form.Item name="ownerName" label="Owner Name">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditRoomForm.propTypes = {
  room: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  refreshRooms: PropTypes.func.isRequired,
};

export default EditRoomForm;
