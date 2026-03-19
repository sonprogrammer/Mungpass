import { Card, Typography } from "antd";

export function Tip() {
    return(
        <Card className=" bg-emerald-50/70! border-emerald-100!">
            <Typography.Title level={5}>
                사장님 Tip
            </Typography.Title>
            <Typography.Text type="secondary">
                유저가 QR을 찍으면 자동으로 목록에 추가됩니다.
            </Typography.Text>

        </Card>
    )
}