'use client'

import { Box, Stack, Skeleton } from "@mui/material";

export function HomeSkeleton() {
    return (
        <Box sx={{ p: 3, width: '100%', boxSizing: 'border-box' }}>
            <Stack spacing={3}>
                {/* //* 환영문구 */}
                <Box>
                    <Skeleton variant="text" width="60%" height={40} sx={{ borderRadius: 2 }} />
                    <Skeleton variant="text" width="40%" height={32} sx={{ borderRadius: 1 }} />
                </Box>

                {/* //* 강아지 관련 카드 */}
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={80}
                    sx={{ borderRadius: 4 }} 
                />

                {/* //* Qr 영역 */}
                <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: 4, display: 'flex'}} />

                {/* //* Menu  */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {[1, 2].map((i) => (
                            <Skeleton key={i} variant="rectangular" width='100%' height={100} sx={{borderRadius: 4}}/>
                    ))}
                </Box>

                {/* //* NearByPlace 영역 */}
                <Box>
                    <Skeleton variant="text" width="30%" height={32} sx={{ mb: 1 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column' ,gap: 2, overflow: 'hidden' }}>
                        <Skeleton variant="rectangular" width="100%" height={140} sx={{ borderRadius: 3, flexShrink: 0 }} />
                        <Skeleton variant="rectangular" width="100%" height={140} sx={{ borderRadius: 3, flexShrink: 0 }} />
                        <Skeleton variant="rectangular" width="100%" height={140} sx={{ borderRadius: 3, flexShrink: 0 }} />
                    </Box>
                    </Box>

            </Stack>
        </Box>
    )
}