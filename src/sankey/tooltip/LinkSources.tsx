import React from 'react'
import round from 'lodash/round'


import { constants } from '../constants'
import { CustomSankeyNode, SankeyLinkTooltipType } from '../types'

interface Props {
    source:  string | (string & CustomSankeyNode)
    target: string | (string & CustomSankeyNode)
    isShow: SankeyLinkTooltipType
}

export const LinkSources: React.FC<Props> = React.memo(function LinkSources({
    source,
    target,
    isShow,
}) {
    const { name: sourceName, value: sourceValue, color: sourceColor } = source as CustomSankeyNode
    const { name: targetName, value: targetValue, color: targetColor } = target as CustomSankeyNode
    const { sourceName: needSourceName, sourcePercentage, linkName, linkPercentage } = isShow

    const sourceLinkValue = sourceValue / targetValue
    const targetLinkValue = targetValue / sourceValue

    const sourceText = getText(needSourceName, sourceName, sourcePercentage, sourceLinkValue)
    const targetText = getText(linkName, targetName, linkPercentage, targetLinkValue)

    return (
        <React.Fragment>
            <div
                key={sourceName}
                style={{ color: sourceColor }}
            >
                {sourceText}
            </div>

            <div
                key={targetName}
                style={{ color: targetColor }}
            >
                {targetText}
            </div>
        </React.Fragment>
    )
})

function getText(needName: boolean, name: string, needPercentage: boolean, value: number) {
    const nameText = needName ? name : ''
    const percentage = needPercentage ? `${round(value * 100)}%` : ''
    const separate = needName && needPercentage ? constants.TOOLTIP_SEPARATE : ''

    return `${nameText}${separate}${percentage}`
}
