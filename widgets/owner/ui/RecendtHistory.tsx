import { Button, Card, Typography } from "antd";
import { TodayDone } from "@/widgets/owner/model/type";

export function RecentHistory({data}: {data: TodayDone[]}) {
    return(
            <Card title="최근 완료 기록" className="shadow-sm">
                <div className="flex flex-col gap-4">
                    {data.map(a => (
                        <div key={a.id} className="flex justify-between">
                            <div>
                                <Typography.Text strong>{a.petName}</Typography.Text>
                                <br />
                                <Typography.Text type="secondary"
                                    style={{fontSize: '10px'}}
                                >{a.totalTime}이용</Typography.Text>
                            </div>
                            <Typography.Text className="text-green-600! font-bold">{a.price}</Typography.Text>
                        </div>
                    ))}
                    <Button block>전체 기록 보기</Button>
                </div>
            </Card>

            
    )
}
