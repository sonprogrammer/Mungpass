'use client'

import { useState } from "react";
import { Layout, ConfigProvider, App } from "antd";
import { AdminSidebar } from "@/widgets/around/admin/ui/AdminSideBar";
import { AdminHeader } from "@/widgets/around/admin/ui/AdminHeader";
import { useRoleGuard } from "@/features/auth/model/useRoleGuard";
import { useUserStore } from "@/entities/user/model/useUserStore";

const { Content } = Layout

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const profile = useUserStore(state => state.profile)
  //* 현재 로그인된 사용자가 admin만 페이지 접근 허용
  useRoleGuard('admin')

  if(!profile) return null

  if(profile.role !== 'admin') return null

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
