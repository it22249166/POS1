import React from "react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  DownOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import "../styles/defaultLayout.css";

const { Header, Sider, Content } = Layout;

class DefaultLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
  };

  handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...");
  };

  getSidebarMenuItems = () => [
    { key: "/", label: "Home", icon: <HomeOutlined />, path: "/" },
    { key: "/bills", label: "Bills", icon: <CopyOutlined />, path: "/bills" },
    { key: "/items", label: "Items", icon: <UnorderedListOutlined />, path: "/items" },
    { key: "/customers", label: "Customers", icon: <UserOutlined />, path: "/customers" },
    { key: "/suppliers", label: "Suppliers", icon: <UserOutlined />, path: "/suppliers" },
    { key: "/reports", label: "Reports", icon: <UnorderedListOutlined />, path: "/reports" },
    { key: "/settings", label: "Settings", icon: <SettingOutlined />, path: "/settings" },
    { key: "/help", label: "Help", icon: <QuestionCircleOutlined />, path: "/help" },
    { key: "/logout", label: "Logout", icon: <LogoutOutlined />, path: "/logout" },
  ];

  renderUserMenu = () => (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={this.handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  renderSidebar = (selectedKey) => (
    <Sider
      trigger={null}
      collapsible
      collapsed={this.state.collapsed}
      style={{ minHeight: "100vh", position: "fixed", left: 0 }}
    >
      <div className="logo text-center py-3">
        <h2 className="text-light m-0" style={{ fontWeight: 700 }}>
          <span style={{ color: "#1890ff" }}>POS</span>
        </h2>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={window.location.pathname}
        className="custom-sidebar"
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
        </Menu.Item>
        <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
        </Menu.Item>
        <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
        </Menu.Item>
        <Menu.Item key="/suppliers" icon={<UserOutlined />}>    
            <Link to="/suppliers">Suppliers</Link>
        </Menu.Item>
        <Menu.Item key="/reports" icon={<UnorderedListOutlined />}>
            <Link to="/reports">Reports</Link>
        </Menu.Item>
        <Menu.Item key="/settings" icon={<SettingOutlined/>}>
            <Link to="/settings">Settings</Link>
        </Menu.Item>
        <Menu.Item key="/help" icon={<QuestionCircleOutlined />}> 
            <Link to="/help">Help</Link>
        </Menu.Item>
        <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={this.handleLogout}>
            <Link to="/logout">Logout</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );

  renderHeader = () => (
    <Header
      className="site-layout-background flex justify-between items-center"
      style={{ padding: "0 24px" }}
    >
      {React.createElement(
        this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: this.toggleSidebar,
        }
      )}

      <div className="flex items-center gap-2">
        <Avatar icon={<UserOutlined />} />
        <Dropdown overlay={this.renderUserMenu()} trigger={["click"]}>
          <span
            className="text-light cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && this.handleLogout()}
          >
            John Doe <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </Header>
  );

  render() {
    const { location, children } = this.props;
    const selectedKey = location.pathname;

    return (
      <Layout>
        {this.renderSidebar(selectedKey)}

        <Layout
          className={classNames("site-layout", {
            "collapsed-layout": this.state.collapsed,
          })}
          style={{ marginLeft: this.state.collapsed ? 80 : 200 }}
        >
          {this.renderHeader()}

          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "#fff",
              borderRadius: 8,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

// Functional wrapper to inject `location` from React Router
function DefaultLayoutWrapper(props) {
  const location = useLocation();
  return <DefaultLayout {...props} location={location} />;
}

export default DefaultLayoutWrapper;