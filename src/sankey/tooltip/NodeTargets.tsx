import React from 'react'

import { constants, defaultSettings } from '../constants'

import {  Link, Node, NumberFormat, SankeyNodeTooltipType } from '../types'
import { numberFormat } from '../../utils/utils'
import { SankeyLink } from 'd3-sankey'

interface Props {
    links: SankeyLink<Node, Link>[]
    format: NumberFormat
    isShow: SankeyNodeTooltipType
    values: string
    value?: number
    color?: string
}

export const NodeTargets: React.FC<Props> = React.memo(function NodeTargets({
    links,
    format,
    isShow,
    values,
    value = 0,
    color = defaultSettings.tooltipColors.decrementColor
}) {
    const { outgoingName, outgoingValue, outgoingPercentage } = isShow
    const needShow = outgoingName || outgoingValue || outgoingPercentage

    if (!links.length || !needShow) {
        return null
    }

    return links.map(link => {  
        const nameText = outgoingName ? (link.target as Node).name : ''
        const valueText = outgoingValue
            ? numberFormat(format, link.value, values)
            : ''
        const leftParen = outgoingValue ? '(' : ''
        const rightParen = outgoingValue ? ')' : ''
        const percentageText = outgoingPercentage
            ? `${leftParen}${Math.round((link.value / value) * 100)}%${rightParen}`
            : ''
        const separate =
            outgoingName && (outgoingValue || outgoingPercentage) ? constants.TOOLTIP_SEPARATE : ''

        const text = `${nameText}${separate}${valueText} ${percentageText}`

        return (
            <div
                key={nameText}
                style={{color}}
            >
                {text}
            </div>
        )
    })
})
