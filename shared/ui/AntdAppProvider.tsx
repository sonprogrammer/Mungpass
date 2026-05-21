'use client'

import { App, ConfigProvider } from "antd"
import React from "react"

export function AntdAppProvider({children}: {children: React.ReactNode}){
    return(
        <ConfigProvider>
            <App>
                {children}
            </App>
        </ConfigProvider>
    )
}