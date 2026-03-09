import React from 'react';
import { Card, List, Typography } from 'antd';
import DefaultLayout from '../Components/defaultLayout';

const Helppage = () => (
  <DefaultLayout>
    <Card>
      <Typography.Title level={2}>Help</Typography.Title>
      <List
        dataSource={[
          'Use Inventory to create and update sellable items.',
          'Use Billing to add products and check out.',
          'Use Reports to monitor stock and revenue snapshots.',
        ]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </Card>
  </DefaultLayout>
);

export default Helppage;
