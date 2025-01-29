import { useEffect, useState } from 'react'
import max from 'lodash/max'

type Position = { x: number; y: number } | null
type TooltipRef = React.RefObject<HTMLDivElement>
type ChartRef = React.RefObject<SVGSVGElement>

const OFFSET = 10

export function useTooltipCoordinate(
    position: Position,
    tooltipRef: TooltipRef,
    chartRef: ChartRef,
) {
    const [coordinate, setCoordinate] = useState({ top: position?.y, left: position?.x })

    useEffect(() => {
        if (!tooltipRef.current || !position) {
            return
        }

        const { left, top } = getCoordinate(position, tooltipRef, chartRef)

        setCoordinate({
            left,
            top,
        })
    }, [position, tooltipRef, chartRef])

    return [coordinate]
}

function getCoordinate(
    position: NonNullable<Position>,
    tooltipRef: TooltipRef,
    chartRef: ChartRef,
) {
    const { top = 0, bottom = 0, right = 0 } = chartRef.current?.getBoundingClientRect() || {}
    const { width = 0, height = 0 } = tooltipRef.current?.getBoundingClientRect() || {}
    const { x, y } = position

    const tooltipLeft = x + width + OFFSET > right ? x - width - OFFSET : x + OFFSET

    const tooltipTop =
        y + height + OFFSET > bottom ? max([top + OFFSET, y - height - OFFSET]) : y + OFFSET

    return {
        left: tooltipLeft,
        top: tooltipTop,
    }
}
