import React from 'react'

import { constants, defaultSettings } from '../constants'

import { Link, Node, NumberFormat, SankeyNodeTooltipType } from '../types'
import { numberFormat } from '../../utils/utils'
import { SankeyLink } from 'd3-sankey'

interface Props {
    links: SankeyLink<Node, Link>[] | undefined | undefined
    format: NumberFormat
    isShow: SankeyNodeTooltipType
    values: string
    value?: number
    color?: string
}

export const NodeSources: React.FC<Props> = React.memo(function NodeSources({
    links,
    format,
    isShow,
    values,
    value = 0,
    color = defaultSettings.tooltipColors.incrementColor
}) {
    const { incomeName, incomeValue, incomePercentage } = isShow
    const needShow = incomeName || incomeValue || incomePercentage

    if (!links?.length || !needShow) {
        return null
    }

    return links.map(link => {
        const nameText = incomeName ? (link.target as Node).name : ''
        const valueText = incomeValue
            ? numberFormat(format, link.value, values)
            : ''
        const leftParen = incomeValue ? '(' : ''
        const rightParen = incomeValue ? ')' : ''
        const percentageText = incomePercentage
            ? `${leftParen}${Math.round((link.value / value) * 100)}%${rightParen}`
            : ''
        const separate =
            incomeName && (incomeValue || incomePercentage) ? constants.TOOLTIP_SEPARATE : ''

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
