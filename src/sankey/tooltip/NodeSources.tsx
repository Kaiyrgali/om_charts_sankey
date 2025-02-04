import React from 'react'

import { Link, Node, NumberFormat, SankeyNodeTooltipType } from '../types'
import { getNodeSourcesParams } from '../../utils/utils'
import { SankeyLink } from 'd3-sankey'

import styles from './Tooltip.module.css'

export interface Props {
    links?: SankeyLink<Node, Link>[]
    format: NumberFormat
    isShow: SankeyNodeTooltipType
    values: string
    value?: number
    color?: string
}

export const NodeSources: React.FC<Props> = React.memo(function NodeSources(props: Props) {
    const { isShow, links, color } = props
    const { incomeName, incomeValue, incomePercentage } = isShow
    const needShow = incomeName || incomeValue || incomePercentage

    if (!links?.length || !needShow) {
        return null
    }

    return links.map(link => {
        const { key, text } = getNodeSourcesParams(link, props)

        return (
            <div
                className={styles.SankeyIncomeTooltip}
                key={key}
                style={{color}}
            >
                {text}
            </div>
        )
    })
})
