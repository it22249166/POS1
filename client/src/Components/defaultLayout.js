import React from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { Link, useLocation } from 'react-router-dom';
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
} from '@ant-design/icons';
import classNames from 'classnames';
import '../styles/defaultLayout.css';

const { Header, Sider, Content } = Layout;

class DefaultLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
  };

  renderSidebar = (selectedKey) => (
    <Sider
      trigger={null}
      collapsible
      collapsed={this.state.collapsed}
      style={{ minHeight: '100vh', position: 'fixed', left: 0 }}
    >
      <div className="logo text-center py-3">
        <h2 className="text-light m-0" style={{ fontWeight: 700 }}>
          <span style={{ color: '#1890ff' }}>POS</span>
        </h2>
      </div>

      <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} className="custom-sidebar">
        <Menu.Item key="/" icon={<HomeOutlined />}><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="/bills" icon={<CopyOutlined />}><Link to="/bills">Bills</Link></Menu.Item>
        <Menu.Item key="/items" icon={<UnorderedListOutlined />}><Link to="/items">Items</Link></Menu.Item>
        <Menu.Item key="/customers" icon={<UserOutlined />}><Link to="/customers">Customers</Link></Menu.Item>
        <Menu.Item key="/suppliers" icon={<UserOutlined />}><Link to="/suppliers">Suppliers</Link></Menu.Item>
        <Menu.Item key="/reports" icon={<UnorderedListOutlined />}><Link to="/reports">Reports</Link></Menu.Item>
        <Menu.Item key="/settings" icon={<SettingOutlined />}><Link to="/settings">Settings</Link></Menu.Item>
        <Menu.Item key="/help" icon={<QuestionCircleOutlined />}><Link to="/help">Help</Link></Menu.Item>
        <Menu.Item key="/logout" icon={<LogoutOutlined />}><Link to="/logout">Logout</Link></Menu.Item>
      </Menu>
    </Sider>
  );

  renderHeader = () => (
    <Header className="site-layout-background flex justify-between items-center" style={{ padding: '0 24px' }}>
      {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: this.toggleSidebar,
      })}

      <div className="flex items-center gap-2">
        <Avatar icon={<UserOutlined />} />
        <Dropdown
          menu={{ items: [{ key: 'logout', label: 'Logout', icon: <LogoutOutlined /> }] }}
          trigger={['click']}
        >
          <span className="text-light cursor-pointer" role="button" tabIndex={0}>
            Cashier <DownOutlined />
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
          className={classNames('site-layout', {
            'collapsed-layout': this.state.collapsed,
          })}
          style={{ marginLeft: this.state.collapsed ? 80 : 200 }}
        >
          {this.renderHeader()}

          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: '#fff',
              borderRadius: 8,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function DefaultLayoutWrapper(props) {
  const location = useLocation();
  return <DefaultLayout {...props} location={location} />;
}

export default DefaultLayoutWrapper;
