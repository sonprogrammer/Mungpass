'use client'

import { useState } from "react";
import { Layout, ConfigProvider, App } from "antd";
import { AdminSidebar } from "@/widgets/around/admin/ui/AdminSideBar";
import { AdminHeader } from "@/widgets/around/admin/ui/AdminHeader";

const { Content } = Layout

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#f97316" } }}>
      <App>
      <Layout style={{ minHeight: '100vh', transition: 'all 0.2s', marginLeft: collapsed ? '80px' : '240px' }}>
        <AdminSidebar collapsed={collapsed} />
        <Layout>
          <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content style={{ margin: '24px', padding: '24px', background: '#fff', borderRadius: '12px' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
      </App>
    </ConfigProvider>
  );
}