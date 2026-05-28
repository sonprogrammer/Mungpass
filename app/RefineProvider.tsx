'use client'

import { Refine } from "@refinedev/core"
import { dataProvider } from "@refinedev/supabase"
import { supabaseClient } from "@/shared/api/supabase/client"
import { useQueryClient } from "@tanstack/react-query"

export function RefineProvider({children}: {children: React.ReactNode}){
    const queryClient = useQueryClient()
    const supabase = supabaseClient()
    return(
        <Refine
            dataProvider={dataProvider(supabase)}
            resources={[
                {name: 'store_registration'},
                {name: 'daily_stats'},
                {name: 'profiles'},
                {name: 'inquiries_room'},
                {name: 'inquiry_messages'},
                {name: 'inquiry_notifications'},
            ]}
            options={{
                syncWithLocation: true, 
                warnWhenUnsavedChanges: true,
                reactQuery: {
                    clientConfig: queryClient
                },
                disableTelemetry: true

            }}
        >
            {children}
        </Refine>
    )
}