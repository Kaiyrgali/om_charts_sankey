import React from 'react'

import { NumberFormatter, SankeyNodeTooltipType } from '../types'
import { getNodeValueParams } from 'utils'

interface Props {
    color: string
    name: string
    isShow: SankeyNodeTooltipType
    numberFormatter: NumberFormatter
    value?: number
}

export const NodeValue = React.memo(function NodeValue({
    color,
    name,
    isShow,
    value,
    numberFormatter,
}: Props) {
    const nodeText = getNodeValueParams(name, isShow, value, numberFormatter)

    return <div style={{ color }}>{nodeText}</div>
})
