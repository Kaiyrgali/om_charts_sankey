import React from 'react'

import { NumberFormat, SankeyNodeTooltipType } from '../types'
import { getNodeValueParams } from '../../utils/utils'

interface Props {
    format: NumberFormat
    values: string
    color: string
    name: string
    isShow: SankeyNodeTooltipType
    value?: number
}

export const NodeValue: React.FC<Props> = React.memo(function NodeValue({
    format,
    values,
    color,
    name,
    isShow,
    value,
}) {
    const nodeText = getNodeValueParams(format, values, name, isShow, value)

    return <div style={{ color }}>{nodeText}</div>
})
