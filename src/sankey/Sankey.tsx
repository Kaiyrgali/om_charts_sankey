import { easeSinOut } from 'd3'
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { defaultSettings } from './constants'
import { SankeyChartLinkTooltip } from './tooltip/LinkTooltip'
import { SankeyChartNodeTooltip } from './tooltip/NodeTooltip'
import {
    addSankeyEventListeners,
    applyLinkAttributes,
    applyRectAttributes,
    applyTextAttributes,
    createSankeyGenerator,
    destroySankeyEventListeners,
    getAnimation,
    getSankeyData,
    hasInvalidDatum,
} from '../utils/utils'
import {
    CustomSankeyNode,
    Datum,
    Settings,
    SVG,
    TooltipState,
} from './types'

import styles from './Sankey.module.css'

interface Props {
    datum: Datum
    width: number
    height: number
    settings: Settings
}

export const Sankey = ({
    datum,
    width: cardWidth,
    height: cardHeight,
    settings,
}: Props) => {
    const {
        nodesSortingType,
        linksSortingType,
        nodeAlign,
        text = defaultSettings.text,
        digitCapacity = defaultSettings.digitCapacityValue,
        format = defaultSettings.format,
        colorMode,
        needTooltip = defaultSettings.needTooltip,
    } = settings
    const sankeyGenerator = useMemo(
        () =>
            createSankeyGenerator(
                nodesSortingType,
                linksSortingType,
                nodeAlign,
                cardWidth,
                cardHeight,
            ),
        [nodesSortingType, linksSortingType, nodeAlign, cardWidth, cardHeight],
    )

    const sankeyData = useMemo(() => {
        return getSankeyData(datum, sankeyGenerator)
    }, [datum, sankeyGenerator])

    const [tooltipState, setTooltipState] = useState<TooltipState>({
        type: null,
        data: null,
        position: null,
    })

    const svgRef = useRef<SVGSVGElement>(null)
    const prevWidth = useRef(cardWidth)
    const prevHeight = useRef(cardHeight)
    const animation = getAnimation(prevWidth.current, prevHeight.current, cardWidth, cardHeight)

    useEffect(() => {
        const container = svgRef.current

        if (!container) {
            return
        }

        const { width } = container.getBoundingClientRect()

        let svg: SVG = select(container).select('svg')

        if (svg.empty()) {
            svg = select(container).append('svg')
        }

        const { nodes, links } = sankeyData

        const rect = svg
            .selectAll<SVGRectElement, CustomSankeyNode>('rect')
            .data(nodes, data => data.name)
            .join(
                enter => enter.append('rect').call(applyRectAttributes),
                update =>
                    update.call(currentSelection => {
                        currentSelection
                            .transition(transition().duration(animation))
                            .call(applyRectAttributes)
                    }),
                exit => exit.remove,
            )

        const link = svg
            .selectAll('path')
            .data(links)
            .join(
                enter => enter
                    .append('path')
                    .call(selection => applyLinkAttributes(selection, colorMode)),
                update =>
                    update.call(currentSelection => {
                        currentSelection
                            .transition(transition().duration(animation))
                            .call(currentSelection =>
                                applyLinkAttributes(currentSelection, colorMode)
                            )
                    }),
                exit => exit.remove,
            )

        svg.selectAll('text')
            .data(nodes)
            .join(
                enter => enter.append('text').call(selection =>
                    applyTextAttributes(selection, width, text, digitCapacity, format),),
                update =>
                    update.call(currentSelection => {
                        currentSelection
                            .transition(transition().duration(animation).ease(easeSinOut))
                            .call(currentSelection =>
                                applyTextAttributes(
                                    currentSelection,
                                    width,
                                    text,
                                    digitCapacity,
                                    format,
                                ),)
                    }),
                exit => exit.remove,
            )

        addSankeyEventListeners(rect, link, setTooltipState, needTooltip)

        prevWidth.current = cardWidth
        prevHeight.current = cardHeight

        return () => {
            destroySankeyEventListeners(rect, link)
            setTooltipState({ type: null, data: null, position: null })
        }
    }, [
        cardWidth,
        cardHeight,
        sankeyData,
        animation,
        settings.colorMode,
        settings.digitCapacity,
        settings.format,
        settings.needTooltip,
        settings.text,
    ])

    if (hasInvalidDatum(datum)) {
        return null
    }

    return (
        <React.Fragment>
            <svg
                className={styles.Sankey}
                ref={svgRef}
            />

            <SankeyChartNodeTooltip
                chartRef={svgRef}
                digitCapacity={settings.digitCapacity}
                format={settings.format}
                params={tooltipState}
                showTooltip={settings.showNodeTooltip}
                colors={settings.tooltipColors}
            />

            <SankeyChartLinkTooltip
                chartRef={svgRef}
                digitCapacity={settings.digitCapacity}
                format={settings.format}
                params={tooltipState}
                showTooltip={settings.showLinkTooltip}
                colors={settings.tooltipColors}
            />
        </React.Fragment>
    )
}
