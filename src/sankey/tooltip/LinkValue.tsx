import React from 'react'

import { Languages, NumberFormatter } from '../types'

import { numberFormat } from '../../utils/utils'
import { constants } from '../constants'

import styles from './Tooltip.module.css'

interface Props {
    value: number
    isShow: boolean
    lang?: Languages
    color?: string
    numberFormatter?: NumberFormatter
}

export const LinkValue: React.FC<Props> = React.memo(function LinkValue({
    value,
    numberFormatter,
    isShow,
    lang = Languages.RU,
    color,
}) {
    if (!isShow) {
        return null
    }

    const formattedValue = numberFormat(value, numberFormatter)
    const linkText = `${constants.valueLabel[lang]}: ${formattedValue}`

    return (
        <div
            className={styles.SankeyValueTooltip}
            style={{color}}
        >
            {linkText}
        </div>
    )
})
