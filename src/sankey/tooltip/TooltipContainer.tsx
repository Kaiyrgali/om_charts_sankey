import React, { useRef } from 'react'

import styles from './Tooltip.module.css'
import { useTooltipCoordinate } from '../../hooks/useTooltipCoordinate';

interface Props {
    chartRef: React.RefObject<SVGSVGElement>
    position: { x: number; y: number } | null
    children: (JSX.Element | null)[] | JSX.Element | null
}

export const TooltipContainer = ({ position, chartRef, children }: Props) => {
    const tooltipRef = useRef<HTMLDivElement>(null)
    const [{ top, left }] = useTooltipCoordinate(position, tooltipRef, chartRef)

    return (
        <div
            className={styles.SankeyTooltip}
            ref={tooltipRef}
            style={{ top, left }}
        >
            {children}
        </div>
    )
}
