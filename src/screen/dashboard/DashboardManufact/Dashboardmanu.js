import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { BarChart } from './DashboardBarChart'
import { GraphChart } from './DashboardGraph'
import { PieChartDash } from './DashboardPieChart'
import { Piechart } from './PieChartDashboard'

export const DashboardManu = ()=>{
    
    return(
        <SafeAreaView>
            <ScrollView >
                <Piechart/>
    <GraphChart/>
    <BarChart/>
    </ScrollView>
    </SafeAreaView>
    )
}