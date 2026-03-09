import React, { useContext, useMemo } from 'react';
import { Button, Card, Col, Divider, Empty, Row, Space, Table, Tag, Typography, message } from 'antd';
import DefaultLayout from '../Components/defaultLayout';
import { PosContext } from '../context';
import '../styles/billpage.css';

const { Title, Text } = Typography;

const Billpage = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(PosContext);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [cartItems],
  );

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const columns = [
    { title: 'Item', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (price) => `$${Number(price).toFixed(2)}` },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => removeFromCart(record._id)}>-</Button>
          <Tag color="blue">{record.quantity}</Tag>
          <Button size="small" onClick={() => addToCart(record)}>+</Button>
        </Space>
      ),
    },
    {
      title: 'Line total',
      key: 'line-total',
      render: (_, record) => `$${(Number(record.price) * record.quantity).toFixed(2)}`,
    },
  ];

  const handleCheckout = () => {
    if (!cartItems.length) {
      message.warning('Add items before checkout');
      return;
    }
    message.success('Checkout complete. Bill has been closed.');
    clearCart();
  };

  return (
    <DefaultLayout>
      <Title level={2}>Billing</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="panel-card" title="Current bill">
            {cartItems.length ? (
              <Table rowKey="_id" dataSource={cartItems} columns={columns} pagination={false} />
            ) : (
              <Empty description="No items added yet" />
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="panel-card" title="Summary">
            <div className="summary-row"><Text>Subtotal</Text><Text>${subtotal.toFixed(2)}</Text></div>
            <div className="summary-row"><Text>Tax (10%)</Text><Text>${tax.toFixed(2)}</Text></div>
            <Divider />
            <div className="summary-row"><Text strong>Total</Text><Text strong>${total.toFixed(2)}</Text></div>
            <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
              <Button type="primary" block onClick={handleCheckout}>Checkout</Button>
              <Button danger block onClick={clearCart}>Clear bill</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default Billpage;
