import { SankeyLinkMinimal } from 'd3-sankey'
import { useMemo } from 'react'
import some from 'lodash/some'
import { Link, SankeyLinkTooltipType, SankeyTypeTooltip, TooltipProps } from '../types'
import { LinkSources } from './LinkSources'
import { LinkValue } from './LinkValue'
import { TooltipContainer } from './TooltipContainer'
import { defaultSettings } from '../constants'

export const SankeyChartLinkTooltip = (props: TooltipProps) => {
    const {
        params: { data, position, type },
        showTooltip = defaultSettings.showLinkTooltip,
        chartRef,
        colors,
        numberFormatter,
    } = props
    const needTooltip = useMemo(() => some(showTooltip), [showTooltip])

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
                numberFormatter={numberFormatter}
                isShow={showTooltip.value}
                value={value}
                color={colors?.linkText}
            />

            <LinkSources
                isShow={showTooltip as SankeyLinkTooltipType}
                source={source}
                target={target}
            />
        </TooltipContainer>
    )
}
