import React from 'react';
import { Card, Typography } from 'antd';
import DefaultLayout from '../Components/defaultLayout';

const Customerpage = () => (
  <DefaultLayout>
    <Card>
      <Typography.Title level={2}>Customers</Typography.Title>
      <Typography.Paragraph>
        Customer management module is ready for integration with your preferred CRM or loyalty backend.
      </Typography.Paragraph>
    </Card>
  </DefaultLayout>
);

export default Customerpage;
