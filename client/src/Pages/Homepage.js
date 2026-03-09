import React, { useContext, useMemo } from 'react';
import { Card, Statistic, Table, Button } from 'antd';
import { DollarCircleOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import DefaultLayout from '../Components/defaultLayout';
import { PosContext } from '../context';
import '../styles/homepage.css';

const Homepage = () => {
  const { items, cartItems } = useContext(PosContext);

  const totals = useMemo(() => {
    const orders = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const sales = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    return { orders, sales };
  }, [cartItems]);

  const stats = [
    { title: 'Current Bill Total', value: totals.sales, icon: <DollarCircleOutlined />, color: '#4caf50', prefix: '$' },
    { title: 'Items in Bill', value: totals.orders, icon: <ShoppingCartOutlined />, color: '#ff9800' },
    { title: 'Inventory Items', value: items.length, icon: <UserOutlined />, color: '#2196f3' },
  ];

  const recentTransactions = cartItems.map((item) => ({
    key: item._id,
    customer: 'Walk-in',
    amount: `$${(Number(item.price) * item.quantity).toFixed(2)}`,
    status: 'In Progress',
  }));

  const columns = [
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return (
    <DefaultLayout>
      <div className="homepage-container">
        <h1 className="title1">Welcome to POS Dashboard</h1>

        <div className="stats-container">
          {stats.map((stat) => (
            <Card key={stat.title} className="stat-card" style={{ borderLeft: `5px solid ${stat.color}` }}>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
                {...(stat.prefix ? { formatter: (value) => `${stat.prefix}${Number(value).toFixed(2)}` } : {})}
              />
            </Card>
          ))}
        </div>

        <div className="actions-container">
          <Link to="/bills"><Button type="primary" size="large">Open Billing</Button></Link>
          <Link to="/reports"><Button type="default" size="large">View Reports</Button></Link>
          <Link to="/items"><Button type="dashed" size="large">Manage Inventory</Button></Link>
        </div>

        <div className="recent-transactions">
          <h2>Current Bill Activity</h2>
          <Table dataSource={recentTransactions} columns={columns} pagination={false} locale={{ emptyText: 'No items billed yet' }} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Homepage;
