import { Card, Col, Row, Skeleton, Statistic } from 'antd';
import { ClockCircleOutlined, PlayCircleOutlined, UserOutlined } from '@ant-design/icons';

export function OwnerSumCards({currentCount, todayVisitCount, avgTime, expectedSales, loading}: {currentCount: number, todayVisitCount?: number, avgTime?: number, expectedSales?: number, loading: boolean}) {

  const renderSkeleton = () => (
        <div className="py-2">
            <Skeleton.Button active size="small" style={{ width: 80, marginBottom: 8 }} />
            <Skeleton.Button active block size="default" />
        </div>
    )
  
    return(
        <Row gutter={[12,12]}>
            {[
                { title: "현재 이용 중", value: currentCount, suffix: "마리", prefix: <PlayCircleOutlined className="text-blue-500!" /> },
                { title: "오늘 총 방문", value: todayVisitCount, suffix: "마리", prefix: <UserOutlined /> },
                { title: "평균 이용 시간", value: avgTime, suffix: "분", prefix: <ClockCircleOutlined className='text-orange-400!' /> },
                { title: "오늘 예상 매출", value: expectedSales, suffix: "원", prefix: null },
            ].map((item, idx) => (
                <Col xs={12} key={idx}>
                    <Card className="shadow-sm border-slate-100!">
                        {loading ? (
                            renderSkeleton()
                        ) : (
                            <Statistic 
                                title={<span className="text-slate-500">{item.title}</span>}
                                value={item.value} 
                                suffix={<span className="text-xs text-slate-400">{item.suffix}</span>}
                                prefix={item.prefix}
                                valueStyle={{ fontSize: '1.25rem', fontWeight: 700 }}
                            />
                        )}
                    </Card>
                </Col>
            ))}
        </Row>
    )
}