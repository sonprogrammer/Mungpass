'use client'

import { Refine } from "@refinedev/core"
import { dataProvider } from "@refinedev/supabase"
import { supabaseClient } from "@/shared/api/supabase/client"

export function RefineProvider({children}: {children: React.ReactNode}){
    return(
        <Refine
            dataProvider={dataProvider(supabaseClient)}
            resources={[
                {name: 'store_registration'},
                {name: 'daily_stats'},
                {name: 'profiles'}
            ]}
            options={{syncWithLocation: true, warnWhenUnsavedChanges: true}}
        >
            {children}
        </Refine>
    )
}