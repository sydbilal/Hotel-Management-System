import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Form, Input, Button, message, InputNumber, Select, Space } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddRoomsTab = ({ refreshRooms }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post('/api/rooms/addroom', values);
      message.success('Room added successfully!');
      form.resetFields();
      if (refreshRooms) refreshRooms(); // Call refresh function to update room list
    } catch (error) {
      message.error('Failed to add room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="roomName" label="Room Name" rules={[{ required: true, message: 'Please enter the room name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="roomNumber" label="Room Number" rules={[{ required: true, message: 'Please enter the room number' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="maxCount" label="Max Count" rules={[{ required: true, message: 'Please enter the max count' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="rentPerDay" label="Rent Per Day" rules={[{ required: true, message: 'Please enter the rent per day' }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status' }]}>
          <Select>
            <Option value="vacant">Vacant</Option>
            <Option value="booked">Booked</Option>
            <Option value="maintenance">Maintenance</Option>
          </Select>
        </Form.Item>
        <Form.Item name="roomDescription" label="Room Description" rules={[{ required: true, message: 'Please enter the room description' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="imageUrls" label="Image URLs" rules={[{ required: true}]}> 
          <Input.TextArea placeholder="Comma-separated URLs" />
        </Form.Item>
        <Form.Item name="currentBookings" label="Current Bookings">
          <Input.TextArea placeholder="Comma-separated booking IDs" />
        </Form.Item>
        <Form.Item name="floor" label="Floor ID" rules={[{ required: false, message: 'Please enter the floor ID' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="roomType" label="Room Type ID" rules={[{ required: false, message: 'Please enter the room type ID' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="services" label="Services">
          <Select mode="tags" placeholder="Select services">
            <Option value="food">Food</Option>
            <Option value="bath">Bath</Option>
            <Option value="snacks">Snacks</Option>
            <Option value="drinks">Drinks</Option>
          </Select>
        </Form.Item>
        <Form.Item name="utilities" label="Utilities">
          <Select mode="tags" placeholder="Select utilities">
            <Option value="wifi">WiFi</Option>
            <Option value="tv">TV</Option>
          </Select>
        </Form.Item>
        <Form.Item name="staff" label="Staff ID">
          <Input />
        </Form.Item>
        <Form.Item name="ownerName" label="Owner Name" rules={[{ required: true}]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Room
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// Add PropTypes validation
AddRoomsTab.propTypes = {
  refreshRooms: PropTypes.func.isRequired,
};

export default AddRoomsTab;
