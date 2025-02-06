import React, { useRef } from 'react'

import styles from './Tooltip.module.css'
import { useTooltipCoordinate } from '../../hooks/useTooltipCoordinate'

interface Props {
        chartRef : React.RefObject<SVGSVGElement>,
    position: { x: number; y: number } | null
    children: (JSX.Element | null)[] | JSX.Element | null
}

export const TooltipContainer = ({ position, chartRef, children }: Props): JSX.Element => {
    const tooltipRef = useRef<HTMLDivElement>(null)
    const [coordinate] = useTooltipCoordinate(position, tooltipRef, chartRef)

    return (
        <div
            className={styles.SankeyTooltip}
            ref={tooltipRef}
            style={coordinate}
        >
            {children}
        </div>
    )
}
