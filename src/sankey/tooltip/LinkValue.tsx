import React from 'react'

import { Languages, NumberFormat } from '../types'

import { numberFormat } from '../../utils/utils'
import { constants, defaultSettings } from '../constants'

interface Props {
    value: number
    format: NumberFormat
    values: string
    isShow: boolean
    lang?: Languages
    color?: string
}

export const LinkValue: React.FC<Props> = React.memo(function LinkValue({
    value,
    format,
    values,
    isShow,
    lang = Languages.RU,
    color = defaultSettings.tooltipColors.linkText
}) {
    if (!isShow) {
        return null
    }

    const formattedValue = numberFormat(format, value, values)
    const linkText = `${constants.valueLabel[lang]}: ${formattedValue}`

    return <div style={{color}}>{linkText}</div>
})
