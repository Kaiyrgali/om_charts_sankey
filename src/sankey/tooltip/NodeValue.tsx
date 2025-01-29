import React from 'react'

import { constants } from '../constants'
import { NumberFormat, SankeyNodeTooltipType } from '../types'
import { numberFormat } from '../../utils/utils'

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
    value = 0,
    isShow: { name: isShowName, value: isShowValue },
}) {
    const nameText = isShowName ? name : ''
    const valueText = isShowValue ? numberFormat(format, value, values) : ''
    const separate = isShowName && isShowValue ? constants.TOOLTIP_SEPARATE : ''

    const nodeText = `${nameText}${separate}${valueText}`

    return <div style={{ color }}>{nodeText}</div>
})
