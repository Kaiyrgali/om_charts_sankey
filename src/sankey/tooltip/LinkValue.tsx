import React from 'react'

import styles from './Tooltip.module.css'
import { Languages, NumberFormat } from '../types'

import { constants } from '../constants'
import { numberFormat } from '../../utils/utils'

interface Props {
    value: number
    format: NumberFormat
        values: string
    isShow: boolean
        lang?: Languages
}

export const LinkValue: React.FC<Props> = React.memo(function LinkValue({
    value,
    format,
    values,
    isShow,
    lang = Languages.RU,
}) {
    if (!isShow) {
        return null
    }

    const formattedValue = numberFormat(format, value, values)
    const linkText = `${constants.valueLabel[lang]}: ${formattedValue}`
    // TODO надо реализовать lang from 'global/helpers'
    // const linkText = `Значение: ${formattedValue}`

    return <div className={styles.SankeyValueTooltip}>{linkText}</div>
})
