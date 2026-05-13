import { Card, Col, Row, Skeleton } from 'antd';
import { ClockCircleOutlined, PlayCircleOutlined, UserOutlined, DollarOutlined } from '@ant-design/icons';

export function OwnerSumCards({ currentCount, todayVisitCount, avgTime, expectedSales, loading, isVerified }: { currentCount: number, todayVisitCount?: number, avgTime?: number, expectedSales?: number, loading: boolean, isVerified: boolean }) {


    console.log('isVreif', isVerified)
    const getDisplayValue = (val?: number) => {
        if (!isVerified) return 0
        return val ?? 0
    }

    const cardItems = [
        { title: "현재 이용 중", value: getDisplayValue(currentCount), suffix: "마리", prefix: <PlayCircleOutlined className="text-blue-500!" /> },
        { title: "오늘 총 방문", value: getDisplayValue(todayVisitCount), suffix: "마리", prefix: <UserOutlined /> },
        { title: "평균 이용 시간", value: getDisplayValue(avgTime), suffix: "분", prefix: <ClockCircleOutlined className='text-orange-400!' /> },
        { title: "오늘 예상 매출", value: getDisplayValue(expectedSales), suffix: "원", prefix: <DollarOutlined className='text-green-500!'/> },
    ]

    return (
        <Row gutter={[12, 12]}>
            {cardItems.map((item, idx) => (
                <Col xs={12} key={idx}>
                    <Card className="shadow-sm! border-slate-100!">
                        <div className='flex flex-col gap-2 mb-2'>
                            <span className="text-slate-500 text-[14px] font-bold">
                                {item.title}
                            </span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <span className='text-[20px] flex items-center leading-none'>
                                {item.prefix}
                            </span>
                            {loading ? (
                                <div className="ml-1 w-16">
                                    <Skeleton.Button active block size="small" style={{ height: 24, borderRadius: 4 }} />
                                </div>
                            ) : (
                                <div className="flex items-baseline leading-none">
                                    <span className="text-[22px] font-bold text-slate-900">
                                        {item.value.toLocaleString()}
                                    </span>
                                    <span className="text-slate-500 text-[14px] ml-1">
                                        {item.suffix}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}