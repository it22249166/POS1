import React, { useContext, useMemo, useState } from 'react';
import { Button, Card, Col, Form, Input, InputNumber, message, Row, Select, Space, Spin, Typography } from 'antd';
import axios from 'axios';
import DefaultLayout from '../Components/defaultLayout';
import { PosContext } from '../context';
import '../styles/itempage.css';

const { Title, Text } = Typography;

const Itempage = () => {
  const { items, addToCart, refreshItems } = useContext(PosContext);
  const [adding, setAdding] = useState(false);

  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category).filter(Boolean))],
    [items],
  );

  const onFinish = async (values) => {
    try {
      setAdding(true);
      await axios.post('/api/items/additem', values);
      await refreshItems();
      message.success('Item added successfully');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to add item');
    } finally {
      setAdding(false);
    }
  };

  return (
    <DefaultLayout>
      <Title level={2}>Inventory</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card title="Add Item" className="panel-card">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Item name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Latte" />
              </Form.Item>
              <Form.Item label="Price" name="price" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                <Input placeholder="drinks / rice / snacks" />
              </Form.Item>
              <Form.Item label="Image URL" name="image" rules={[{ required: true }]}>
                <Input placeholder="https://..." />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={adding} block>
                Save Item
              </Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card
            title="Available Items"
            className="panel-card"
            extra={<Text type="secondary">{items.length} in stock</Text>}
          >
            {!items.length ? (
              <Spin />
            ) : (
              <>
                <Space wrap style={{ marginBottom: 16 }}>
                  <Text strong>Categories:</Text>
                  {categories.map((category) => (
                    <Select
                      key={category}
                      defaultValue={category}
                      disabled
                      style={{ minWidth: 100 }}
                      options={[{ label: category, value: category }]}
                    />
                  ))}
                </Space>

                <Row gutter={[12, 12]}>
                  {items.map((item) => (
                    <Col key={item._id} xs={24} sm={12} xl={8}>
                      <Card
                        cover={<img alt={item.name} src={item.image} className="item-image" />}
                        actions={[
                          <Button type="primary" onClick={() => addToCart(item)}>
                            Add to bill
                          </Button>,
                        ]}
                      >
                        <Card.Meta
                          title={item.name}
                          description={`${item.category} • $${Number(item.price).toFixed(2)}`}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default Itempage;
