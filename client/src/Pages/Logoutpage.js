import React from 'react';
import { Button, Card, Typography, message } from 'antd';
import DefaultLayout from '../Components/defaultLayout';

const Logoutpage = () => (
  <DefaultLayout>
    <Card>
      <Typography.Title level={2}>Logout</Typography.Title>
      <Typography.Paragraph>
        End your session safely when your shift is complete.
      </Typography.Paragraph>
      <Button type="primary" danger onClick={() => message.success('Logged out successfully')}>Sign out</Button>
    </Card>
  </DefaultLayout>
);

export default Logoutpage;
