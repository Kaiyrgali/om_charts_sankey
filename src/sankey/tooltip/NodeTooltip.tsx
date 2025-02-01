import React, { useMemo } from 'react'

import { CustomSankeyNode, SankeyNodeTooltipType, SankeyTypeTooltip, TooltipProps } from '../types'
import { NodeSources } from './NodeSources'
import { NodeTargets } from './NodeTargets'
import { NodeValue } from './NodeValue'
import { TooltipContainer } from './TooltipContainer'
import { defaultSettings } from '../constants'

export const SankeyChartNodeTooltip: React.FC<TooltipProps> = props => {
    const {
        params: { data, position, type },
        showTooltip = defaultSettings.showNodeTooltip,
        chartRef,
        digitCapacity: { values } = defaultSettings.digitCapacityValue,
        format,
        colors = defaultSettings.tooltipColors
    } = props
    const needTooltip = useMemo(() => Object.values(showTooltip).find(show => show), [showTooltip])

    if (type !== SankeyTypeTooltip.NODE) {
        return null
    }

    const { name, value, sourceLinks, targetLinks, color } = data as CustomSankeyNode
    const {
        name: showName,
        value: showValue,
        incomeName,
        incomeValue,
        incomePercentage,
        outgoingName,
        outgoingValue,
        outgoingPercentage,
    } = showTooltip as SankeyNodeTooltipType
    const skipSourceTooltip =
        !targetLinks?.length &&
        !(showName || showValue || outgoingName || outgoingValue || outgoingPercentage)
    const skipTargetTooltip =
        !sourceLinks?.length &&
        !(showName || showValue || incomeName || incomeValue || incomePercentage)

    if (!needTooltip || skipSourceTooltip || skipTargetTooltip) {
        return null
    }

    return (
        <TooltipContainer
            chartRef={chartRef}
            position={position}
        >
            <NodeValue
                color={color}
                format={format!}
                isShow={showTooltip as SankeyNodeTooltipType}
                name={name}
                value={value}
                values={values}
            />

            <NodeSources
                format={format!}
                isShow={showTooltip as SankeyNodeTooltipType}
                links={targetLinks}
                value={value}
                values={values}
                color={colors?.incrementColor}
            />

            <NodeTargets
                format={format!}
                isShow={showTooltip as SankeyNodeTooltipType}
                links={sourceLinks}
                value={value}
                values={values}
                color={colors?.decrementColor}
            />
        </TooltipContainer>
    )
}
