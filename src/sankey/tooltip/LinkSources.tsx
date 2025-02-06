import React from 'react'

import { LinkSource, SankeyLinkTooltipType } from '../types'
import { getLinkSourcesParams } from '../../utils/utils'

export interface Props {
    source: LinkSource
    target: LinkSource
    isShow: SankeyLinkTooltipType
}

export const LinkSources: React.FC<Props> = React.memo(function LinkSources(props) {
    const {
        sourceName,
        sourceColor,
        sourceText,
        targetName,
        targetColor,
        targetText,
    } = getLinkSourcesParams(props)

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
