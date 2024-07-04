// AdminPage.jsx
import React, { useState } from 'react';
import { Tabs } from 'antd';
import Navbar from '../Components/Navbar';
import RoomsTab from '../Components/RoomsTab';
import UsersTab from '../Components/UsersTab';
import AddRoomsTab from '../Components/AddRoomsTab';

const AdminPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshRooms = () => {
    setRefreshKey(prev => prev + 1);
  };

  const items = [
    {
      key: '1',
      label: 'Bookings',
      children: 'All Bookings',
    },
    {
      key: '2',
      label: 'Rooms',
      children: <RoomsTab refreshKey={refreshKey} />,
    },
    {
      key: '3',
      label: 'Add Rooms',
      children: <AddRoomsTab refreshRooms={refreshRooms} />,
    },
    {
      key: '4',
      label: 'Users',
      children: <UsersTab />,
    },
  ];

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-2xl mt-10">Admin Panel</h1>
      <Tabs className="mt-10 ml-10" defaultActiveKey="1" items={items} />
    </div>
  );
};

export default AdminPage;
