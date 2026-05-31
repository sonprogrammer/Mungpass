'use client'

import { Layout, Button, Space, Avatar, Dropdown, Typography } from "antd";
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  UserOutlined,
  LogoutOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { cookieLogout } from "@/features/auth/api/logoutAction";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { AdminNotificationDropdown } from "@/entities/admin/notification/ui/AdminNotiDropdown";

const { Header } = Layout;
const { Text } = Typography;

interface AdminHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function AdminHeader({ collapsed, setCollapsed }: AdminHeaderProps) {
  const handlelogout = useUserStore(state => state.logout)
  const resetLoginTabRole = useUserStore(state => state.resetLoginTabRole)

  const logout = async() => {
    await cookieLogout()
    handlelogout()
    resetLoginTabRole()
  }
  
  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: '내 프로필' },
    { key: 'settings', icon: <SettingOutlined />, label: '설정' },
    { type: 'divider' as const },
    { key: 'logout', icon: <LogoutOutlined />, label: '로그아웃', danger: true, onClick: logout },
  ];

  
  return (
    <Header 
      style={{ 
        padding: '0 24px', 
        background: '#fff', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        height: '64px',
        borderBottom: '1px solid #f0f0f0'
      }}
    >
      <Space>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: '18px', width: 40, height: 40 }}
        />
        <Text strong className="hidden md:inline-block text-lg ml-2">
          관리자 센터
        </Text>
      </Space>

      <Space size={16} align="center">
        <AdminNotificationDropdown />


        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <Space style={{ cursor: 'pointer' }} className="hover:opacity-80 transition-opacity p-1.5 rounded-lg hover:bg-gray-50">
            <Avatar 
              style={{ backgroundColor: '#f97316' }} 
              icon={<UserOutlined />} 
            />
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <Text strong style={{ fontSize: '13px', color: '#1f2937' }}>운영지원팀</Text>
              <Text type="secondary" style={{ fontSize: '11px' }}>Admin</Text>
            </div>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};