import React from 'react';
import { Card, Typography } from 'antd';
import DefaultLayout from '../Components/defaultLayout';

const Supplierpage = () => (
  <DefaultLayout>
    <Card>
      <Typography.Title level={2}>Suppliers</Typography.Title>
      <Typography.Paragraph>
        Track supplier records and purchasing workflows from this section.
      </Typography.Paragraph>
    </Card>
  </DefaultLayout>
);

export default Supplierpage;
