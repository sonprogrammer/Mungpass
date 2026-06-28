'use client'

import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  ShopOutlined,
  UserOutlined,
  // GiftOutlined,
  CustomerServiceOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetAdminInquiryNoti } from "@/entities/admin/inquiry/model/useGetAminInquiryNoti";
import { useGetReqRegistration } from "@/entities/admin/inquiry/model/useGetReqRegistration";

const { Sider } = Layout;

export function AdminSidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  const { data: adminNoti = [] } = useGetAdminInquiryNoti()
  const unReadCount = adminNoti.length

  const { data: regiCount } = useGetReqRegistration()



  const menuItems = [
    { key: '/admin', icon: <DashboardOutlined />, label: <Link href="/admin">대시보드</Link> },
    {
      key: '/admin/stores', icon: <ShopOutlined />, label: (
        <Link href="/admin/stores" className="flex items-center justify-between w-full">
          <span>입점 심사</span>
          {(regiCount ?? 0) > 0 && (
            <span className="ml-2 min-w-5 h-5 px-1 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center">
              {regiCount}
            </span>
          )}
        </Link>
      )
    },
    { key: '/admin/users', icon: <UserOutlined />, label: <Link href="/admin/user-manage">회원 관리</Link> },
    // TODO 추후에 추가 해보기
    // { key: '/admin/coupons', icon: <GiftOutlined />, label: <Link href="/admin/coupons">쿠폰 관리</Link> },
    {
      key: '/admin/support', icon: <CustomerServiceOutlined />, label: (
        <Link href="/admin/support" className="flex items-center justify-between w-full">
          <span>고객 문의</span>
          {unReadCount > 0 && (
            <span className="ml-2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
              {unReadCount}
            </span>
          )}
        </Link>
      )
    },
  ];



  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light"
      width={240}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        borderRight: '1px solid #f0f0f0'
      }}
    >
      <div className="h-16 flex items-center justify-center">
        <span className="text-orange-500 font-black text-xl">
          {collapsed ? 'M' : 'MungPass'}
        </span>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};