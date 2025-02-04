import React from 'react'
import { Props } from './NodeSources'

import styles from './Tooltip.module.css'
import { getNodeTargetParams } from '../../utils/utils'

export const NodeTargets = React.memo(function NodeTargets(props: Props) {
    const { isShow, links, color } = props
    const { outgoingName, outgoingValue, outgoingPercentage } = isShow
    const needShow = outgoingName || outgoingValue || outgoingPercentage

    if (!links?.length || !needShow) {
        return null
    }

    return links.map(link => {  
        const { key, text } = getNodeTargetParams(link, props)

        return (
            <div
                className={styles.SankeyOutgoingTooltip}
                key={key}
                style={{color}}
            >
                {text}
            </div>
        )
    })
})
