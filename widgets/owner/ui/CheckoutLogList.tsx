//* 지금 안쓰고 있음 - 추후 필요할 수 있으니깐 납둠

import { Button, Card, Typography } from "antd";
import { CurrentUsageLog } from "@/entities/check-in/model/types";

export function CheckoutLogList({data}: {data: CurrentUsageLog[]}) {
    return(
            <Card title="최근 완료 기록" className="shadow-sm">
                <div className="flex flex-col gap-4">
                    {data.map(a => (
                        <div key={a.id} className="flex justify-between">
                            <div>
                                <Typography.Text strong>{a.dog?.name}</Typography.Text>
                                <br />
                                <Typography.Text type="secondary"
                                    style={{fontSize: '10px'}}
                                >
                                    {/* //TODO 여기ㅣ도 실시간 이용시간으로 바꾸기 */}
                                    {a.product?.duration_minutes}이용</Typography.Text>
                            </div>
                            <Typography.Text className="text-green-600! font-bold">{a.product?.price}</Typography.Text>
                        </div>
                    ))}
                    <Button block>전체 기록 보기</Button>
                </div>
            </Card>

            
    )
}
