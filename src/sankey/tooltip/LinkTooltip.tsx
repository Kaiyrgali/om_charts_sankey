import React, { useMemo } from 'react'
import { SankeyLinkMinimal } from 'd3-sankey'
import some from 'lodash/some'

import { Link, SankeyLinkTooltipType, TooltipType, TooltipProps } from '../types'
import { LinkSources } from './LinkSources'
import { LinkValue } from './LinkValue'
import { TooltipContainer } from './TooltipContainer'

export const LinkTooltip = (props: TooltipProps): React.ReactElement | null => {
    const {
        params: { data, position, type },
        showTooltip,
        chartRef,
        colors,
        numberFormatter,
    } = props
    const needTooltip = useMemo(() => some(showTooltip), [showTooltip])

    if (type !== TooltipType.LINK || !needTooltip) {
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
