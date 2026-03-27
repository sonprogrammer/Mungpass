import { Card, Col, Row, Statistic } from 'antd';
import { ClockCircleOutlined, PlayCircleOutlined, UserOutlined } from '@ant-design/icons';

export function OwnerSumCards({currentCount, todayVisitCount, avgTime, expectedSales}: {currentCount: number, todayVisitCount?: number, avgTime?: number, expectedSales?: number}) {
    return(
        <Row gutter={[12,12]}>
            <Col xs={12} >
              <Card  className="shadow-sm">
                <Statistic title="현재 이용 중" 
                  value={currentCount} 
                  suffix={<span className="text-xs">마리</span>}
                  prefix={<PlayCircleOutlined className="text-blue-500!" />} />
              </Card>
            </Col>
            <Col xs={12} >
              <Card  className="shadow-sm">
                <Statistic title="오늘 총 방문" 
                  value={todayVisitCount} 
                  suffix={<span className="text-xs">마리</span>}
                  prefix={<UserOutlined />} />
              </Card>
            </Col>
            <Col xs={12}>
              <Card  className="shadow-sm">
                <Statistic title="평균 이용 시간" 
                  value={avgTime} 
                  suffix={<span className="text-xs">분</span>}
                  prefix={<ClockCircleOutlined className='text-orange-400! '/>}/>
              </Card>
            </Col>
            <Col xs={12}>
              <Card  className="shadow-sm h-full">
                <Statistic title="오늘 예상 매출" 
                  value={expectedSales} 
                  suffix={<span className="text-xs">원</span>}
                  />
              </Card>
            </Col>
        </Row>
    )
}