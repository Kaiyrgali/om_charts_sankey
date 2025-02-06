import React, { useMemo } from 'react'
import some from 'lodash/some'
import { CustomSankeyNode, SankeyNodeTooltipType, SankeyTypeTooltip, TooltipProps } from '../types'
import { NodeSources } from './NodeSources'
import { NodeTargets } from './NodeTargets'
import { NodeValue } from './NodeValue'
import { TooltipContainer } from './TooltipContainer'
import { defaultSettings } from '../constants'
import { needSkipTooltip } from '../../utils/utils'

export const SankeyChartNodeTooltip: React.FC<TooltipProps> = props => {
    const {
        params: { data, position, type },
        showTooltip = defaultSettings.showNodeTooltip,
        chartRef,
        numberFormatter,
        colors,
    } = props
    const needTooltip = useMemo(() => some(showTooltip), [showTooltip])
    const isNode = type === SankeyTypeTooltip.NODE

    if (!isNode || !needTooltip || needSkipTooltip(data, showTooltip as SankeyNodeTooltipType)) {
        return null
    }

    const { name, value, sourceLinks, targetLinks, color } = data as CustomSankeyNode

    return (
        <TooltipContainer
            chartRef={chartRef}
            position={position}
        >
            <NodeValue
                color={color}
                numberFormatter={numberFormatter!}
                isShow={showTooltip as SankeyNodeTooltipType}
                name={name}
                value={value}
            />

            <NodeSources
                isShow={showTooltip as SankeyNodeTooltipType}
                links={targetLinks}
                value={value}
                color={colors?.incrementColor}
                numberFormatter={numberFormatter}
            />

            <NodeTargets
                isShow={showTooltip as SankeyNodeTooltipType}
                links={sourceLinks}
                value={value}
                color={colors?.decrementColor}
                numberFormatter={numberFormatter}
            />
        </TooltipContainer>
    )
}
