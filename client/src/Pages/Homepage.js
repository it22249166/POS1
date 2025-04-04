import React from "react";
import { Card, Statistic, Table, Button } from "antd";
import { DollarCircleOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import DefaultLayout from "../Components/defaultLayout";
import "../styles/homepage.css";

const Homepage = () => {
  const stats = [
    { title: "Total Sales", value: "$12,450", icon: <DollarCircleOutlined />, color: "#4caf50" },
    { title: "Total Orders", value: "234", icon: <ShoppingCartOutlined />, color: "#ff9800" },
    { title: "Total Customers", value: "150", icon: <UserOutlined />, color: "#2196f3" },
  ];

  const recentTransactions = [
    { key: "1", customer: "John Doe", amount: "$200", status: "Completed" },
    { key: "2", customer: "Jane Smith", amount: "$450", status: "Pending" },
    { key: "3", customer: "Mike Johnson", amount: "$100", status: "Completed" },
  ];

  const columns = [
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Status", dataIndex: "status", key: "status" },
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
              />
            </Card>
          ))}
        </div>

        <div className="actions-container">
          <Button type="primary" size="large">New Sale</Button>
          <Button type="default" size="large">View Reports</Button>
          <Button type="dashed" size="large">Manage Inventory</Button>
        </div>

        <div className="recent-transactions">
          <h2>Recent Transactions</h2>
          <Table dataSource={recentTransactions} columns={columns} pagination={false} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Homepage;
