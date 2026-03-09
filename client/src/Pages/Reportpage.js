import React, { useContext } from 'react';
import { Card, Col, Row, Statistic, Table, Typography } from 'antd';
import DefaultLayout from '../Components/defaultLayout';
import { PosContext } from '../context';

const { Title } = Typography;

const Reportpage = () => {
  const { items, cartItems } = useContext(PosContext);

  const categoryMap = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const rows = Object.entries(categoryMap).map(([category, count]) => ({ key: category, category, count }));
  const gross = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <DefaultLayout>
      <Title level={2}>Reports</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}><Card><Statistic title="Inventory Count" value={items.length} /></Card></Col>
        <Col xs={24} md={8}><Card><Statistic title="Gross Sales (Current Bill)" value={gross} precision={2} prefix="$" /></Card></Col>
        <Col xs={24} md={8}><Card><Statistic title="Distinct Categories" value={rows.length} /></Card></Col>
      </Row>
      <Card title="Items by category" style={{ marginTop: 16 }}>
        <Table dataSource={rows} pagination={false} columns={[{ title: 'Category', dataIndex: 'category' }, { title: 'Item Count', dataIndex: 'count' }]} />
      </Card>
    </DefaultLayout>
  );
};

export default Reportpage;
