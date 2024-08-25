// BookingsTab.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const BookingsTab = ({ refreshKey, refreshRooms }) => {  // Add refreshRooms prop
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/bookings/getallbookings');
      setBookings(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/bookings/bookings/${id}`);
      message.success('Booking deleted successfully!');
      fetchBookings();  // Refresh the bookings list after deletion
      refreshRooms();  // Refresh the rooms list
    } catch (error) {
      message.error('Failed to delete booking.');
    }
  };

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Room Number',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'User ID',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Start Date',
      dataIndex: ['dates', 'startDate'],
      key: 'startDate',
      render: (startDate) => new Date(startDate).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: ['dates', 'endDate'],
      key: 'endDate',
      render: (endDate) => new Date(endDate).toLocaleDateString(),
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            // Add editing functionality if needed
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
        <p>Loading bookings...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table dataSource={bookings} columns={columns} rowKey="_id" />
      )}
    </div>
  );
};

export default BookingsTab;
