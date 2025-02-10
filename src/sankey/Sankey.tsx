import React, { useEffect, useMemo, useRef, useState } from 'react'
import { easeSinOut } from 'd3'
import { select } from 'd3-selection'
import { transition } from 'd3-transition'

import { defaultSettings } from './constants'
import { LinkTooltip, NodeTooltip } from './tooltip'
import {
    addSankeyEventListeners,
    applyLinkAttributes,
    applyRectAttributes,
    applyTextAttributes,
    createDatum,
    createSankeyGenerator,
    getAnimation,
    getSankeyData,
    hasInvalidDatum,
} from 'utils'
import {
    ChartDimensions,
    CustomSankeyNode,
    SankeyDatum,
    Settings,
    SVG,
    TooltipState,
} from './types'

import styles from './Sankey.module.css'

interface Props {
    datum: SankeyDatum
    width: ChartDimensions['width']
    height: ChartDimensions['height']
    settings: Settings
}

export const Sankey = ({
    datum: incomingDatum,
    width: cardWidth = defaultSettings.width,
    height: cardHeight = defaultSettings.height,
    settings,
}: Props): JSX.Element | null => {
    const {
        nodesSortingType,
        linksSortingType,
        nodeAlign,
        colorMode,
        needTooltip,
        text,
        showNodeTooltip,
        showLinkTooltip,
        tooltipColors,
        numberFormatter,
    } = { ...defaultSettings, ...settings }
    const datum = useMemo(
        () => createDatum(incomingDatum),
        [incomingDatum],
    )
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
        const abortController = new AbortController()
        const { signal } = abortController
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
                    applyTextAttributes(selection, width, text, numberFormatter),),
                update =>
                    update.call(currentSelection => {
                        currentSelection
                            .transition(transition().duration(animation).ease(easeSinOut))
                            .call(currentSelection =>
                                applyTextAttributes(
                                    currentSelection,
                                    width,
                                    text,
                                    numberFormatter,
                                ),)
                    }),
                exit => exit.remove,
            )

        addSankeyEventListeners(rect, link, setTooltipState, needTooltip, signal)

        prevWidth.current = cardWidth
        prevHeight.current = cardHeight

        return (): void => {
            abortController.abort()
            setTooltipState({ type: null, data: null, position: null })
        }
    }, [
        cardWidth,
        cardHeight,
        sankeyData,
        animation,
        colorMode,
        needTooltip,
        text,
        numberFormatter,
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

            <NodeTooltip
                chartRef={svgRef}
                params={tooltipState}
                showTooltip={showNodeTooltip}
                colors={tooltipColors}
                numberFormatter={numberFormatter}
            />

            <LinkTooltip
                chartRef={svgRef}
                params={tooltipState}
                showTooltip={showLinkTooltip}
                colors={tooltipColors}
                numberFormatter={numberFormatter}
            />
        </React.Fragment>
    )
}
