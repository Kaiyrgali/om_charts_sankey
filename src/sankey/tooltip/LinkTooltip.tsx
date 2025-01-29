import { SankeyLinkMinimal } from 'd3-sankey'
import { useMemo } from 'react'

import { Link, SankeyLinkTooltipType, SankeyTypeTooltip, TooltipProps } from '../types'
import { LinkSources } from './LinkSources'
import { LinkValue } from './LinkValue'
import { TooltipContainer } from './TooltipContainer'

export const SankeyChartLinkTooltip = (props: TooltipProps) => {
    const {
        params: { data, position, type },
        digitCapacity: { values },
        showTooltip,
        format,
        chartRef,
    } = props
    const needTooltip = useMemo(() => Object.values(showTooltip).find(show => show), [showTooltip])

    if (type !== SankeyTypeTooltip.LINK || !needTooltip) {
        return null
    }

    const { value, source, target } = (data as Link & SankeyLinkMinimal<Node, Link>) || {}

    return (
        <TooltipContainer
            chartRef={chartRef}
            position={position}
        >
            <LinkValue
                format={format}
                isShow={showTooltip.value}
                value={value}
                values={values}
            />

            <LinkSources
                isShow={showTooltip as SankeyLinkTooltipType}
                source={source}
                target={target}
            />
        </TooltipContainer>
    )
}
