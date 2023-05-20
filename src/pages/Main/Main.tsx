import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Col, Grid, Layout, Row, Typography, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { LanguageSwitcher } from 'src/components/LanguageSwitcher/LanguageSwitcher';
import { Logo } from 'src/components/Logo/Logo';
import { SidebarMenu } from 'src/components/SidebarMenu/SidebarMenu';
import { UserProfileMenu } from 'src/components/UserProfileMenu/UserProfileMenu';
import { Forbidden } from '../Forbidden/Forbidden';
import './Main.css';

const { Sider } = Layout;

const { Title } = Typography;

const { useBreakpoint } = Grid;

export const Main = ({ roles = [], content }) => {
  const { user } = useSelector((state: any) => state.auth);
  const [breakpoint, setBreakpoint] = useState<any>();
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(200);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { selectedKeys } = useSelector((state: any) => state.sidebarMenu);
  const { md, lg } = useBreakpoint();

  useEffect(() => {
    if (!lg && md) {
      setBreakpoint('lg');
      setCollapsedWidth(80);
    }
    if (!md) {
      setBreakpoint('md');
      setCollapsedWidth(0);
    }
  }, [lg, md]);

  if (roles.length && !roles.includes(user.role)) {
    return <Forbidden />;
  }
  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint={breakpoint}
        collapsed={collapsed}
        collapsedWidth={collapsedWidth}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Logo />
        <SidebarMenu />
      </Sider>
      <Layout>
        <Row style={{ background: colorBgContainer }}>
          <Col xs={24} sm={12} style={{ display: 'flex' }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
                style: { marginTop: 2 },
              }
            )}
            <Title level={3} style={{ marginTop: 15 }}>
              {!Array.isArray(selectedKeys) && (
                <FormattedMessage
                  id={`components.sidebarMenu.${selectedKeys}`}
                />
              )}
            </Title>
          </Col>
          <Col sm={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <UserProfileMenu />
            <LanguageSwitcher />
          </Col>
        </Row>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {content}
        </Content>
      </Layout>
    </Layout>
  );
};
