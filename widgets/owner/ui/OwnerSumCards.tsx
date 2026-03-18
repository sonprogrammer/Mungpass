import { Card, Col, Row, Statistic } from 'antd';
import { PlayCircleOutlined, UserOutlined } from '@ant-design/icons';

export function OwnerSumCards({currentCount}: {currentCount: number}) {
    return(
        <Row gutter={[16,16]}>
            <Col span={6}>
              <Card  className="shadow-sm">
                <Statistic title="현재 이용 중" value={currentCount} suffix="마리" prefix={<PlayCircleOutlined className="text-blue-500" />} />
              </Card>
            </Col>
            <Col span={6}>
              <Card  className="shadow-sm">
                <Statistic title="오늘 총 방문" value={15} suffix="마리" prefix={<UserOutlined />} />
              </Card>
            </Col>
            <Col span={6}>
              <Card  className="shadow-sm">
                <Statistic title="평균 이용 시간" value={3.5} suffix="시간" />
              </Card>
            </Col>
            <Col span={6}>
              <Card  className="shadow-sm">
                <Statistic title="오늘 예상 매출" value={245000} suffix="원" />
              </Card>
            </Col>
        </Row>
    )
}