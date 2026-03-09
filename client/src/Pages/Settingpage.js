import React from 'react';
import { Card, Typography } from 'antd';
import DefaultLayout from '../Components/defaultLayout';

const Settingpage = () => (
  <DefaultLayout>
    <Card>
      <Typography.Title level={2}>Settings</Typography.Title>
      <Typography.Paragraph>
        Configure tax, receipt templates, and cashier preferences here.
      </Typography.Paragraph>
    </Card>
  </DefaultLayout>
);

export default Settingpage;
