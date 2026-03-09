'use client'

import { List, DateField } from "@refinedev/antd";
import { Table, Space, Button, Tag, Typography, Modal, message } from "antd";
import {  FileSearchOutlined } from "@ant-design/icons";

const { Text } = Typography;

const mockData = [
  {
    id: "1",
    created_at: "2026-03-09T10:00:00Z",
    store_name: "멍멍스테이 천안점",
    business_number: "123-45-67890",
    biz_reg_image_url: "sample-license-1.jpg",
    status: "PENDING",
  },
  {
    id: "2",
    created_at: "2026-03-08T14:20:00Z",
    store_name: "개편한세상 강남본점",
    business_number: "220-88-12345",
    biz_reg_image_url: "sample-license-2.jpg",
    status: "APPROVED",
  },
  {
    id: "3",
    created_at: "2026-03-07T09:15:00Z",
    store_name: "멍뭉패스 경기광주점",
    business_number: "405-12-99887",
    biz_reg_image_url: "sample-license-3.jpg",
    status: "REJECTED",
  }
];

export default function StoreRegistrationList() {
  const handleStatusUpdate = (id: string, status: 'APPROVED' | 'REJECTED') => {
    Modal.confirm({
      title: `신청 건을 ${status === 'APPROVED' ? '승인' : '거절'}하시겠습니까?`,
      okText: '확인',
      cancelText: '취소',
      onOk: () => message.success(`처리가 완료되었습니다.`)
    });
  };

  return (
    <List title="입점 심사 관리">
      <Table 
        dataSource={mockData} 
        rowKey="id" 
        scroll={{ x: 800 }} 
        pagination={{ pageSize: 10 }}
      >
        {/* //*신청일*/}
        <Table.Column 
          dataIndex="created_at" 
          title="신청일" 
          width={150}
          responsive={['sm']} 
          render={(value) => <DateField value={value} format="YYYY-MM-DD" />} 
        />

        {/* //*가게 정보 */}
        <Table.Column 
          title="지점 정보"
          fixed="left" 
          render={(_, record: any) => (
            <Space direction="vertical" size={0}>
              <Text strong className="block truncate" style={{ maxWidth: '150px' }}>
                {record.store_name}
              </Text>
              <Text type="secondary" className="text-[11px]!">{record.business_number}</Text>
            </Space>
          )}
        />


          {/* //* 사업자 등록증 */}
        <Table.Column
          title="서류"
          dataIndex="biz_reg_image_url"
          width={100}
          responsive={['md']} 
          render={(value) => (
            <Button 
              size="small" 
              shape="circle"
              icon={<FileSearchOutlined />}
              onClick={() => alert(`파일: ${value}`)}
            />
          )}
        />

        {/* //*현재 처리 상태 */}
        <Table.Column 
          dataIndex="status" 
          title="상태" 
          width={100}
          align="center"
          render={(value) => (
            <Tag color={value === 'PENDING' ? 'orange' : value === 'APPROVED' ? 'green' : 'red'} className="m-0">
              {value}
            </Tag>
          )}
        />

        {/* //*심사 */}
        <Table.Column
          title="심사"
          width={150}
          fixed="right"
          align="center"
          render={(_, record: any) => (
            <Space>
              {record.status === 'PENDING' ? (
                <>
                  <Button 
                    size="small" 
                    type="primary" 
                    onClick={() => handleStatusUpdate(record.id, 'APPROVED')}
                  >
                    승인
                  </Button>
                  <Button 
                    size="small" 
                    danger 
                    onClick={() => handleStatusUpdate(record.id, 'REJECTED')}
                  >
                    거절
                  </Button>
                </>
              ) : (
                <Text disabled className="text-xs!">완료</Text>
              )}
            </Space>
          )}
        />
      </Table>
    </List>
  );
}