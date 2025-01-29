import { easeSinOut, interpolateNumber } from 'd3'
import { SankeyLink, sankeyLinkHorizontal } from 'd3-sankey'
import { BaseType, select } from 'd3-selection'
import { transition } from 'd3-transition'
import map from 'lodash/map'
import assign from 'lodash/assign'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { constants } from './constants'
import { SankeyChartLinkTooltip } from './tooltip/LinkTooltip'
import { SankeyChartNodeTooltip } from './tooltip/NodeTooltip'
import { createSankeyGenerator, getText, hasInvalidDatum } from '../utils/utils'
import {
    CustomSankeyNode,
    SankeyDatum,
    Node,
    SankeySettings,
    SankeyTypeTooltip,
    RectSelection,
    NodeSelection,
    LinkSelection,
    PathSelection,
    SankeyDirection,
    LabelSelection,
    TextSelection,
    SVG,
    TooltipState,
    Link,
} from './types'

import styles from './SankeyChart.module.css'

interface Props {
    datum: SankeyDatum
    width: number
    height: number
    settings: SankeySettings
}

const { HOVER_OPACITY, NORMAL_OPACITY, ANIMATION_FAST } = constants

export const Sankey = ({
    datum,
    width: cardWidth,
    height: cardHeight,
    settings,
}: Props) => {
    const { nodesSortingType, linksSortingType, nodeAlign } = settings
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
        if (hasInvalidDatum(datum)) {
            return {
                nodes: [],
                links: [],
            }
        }

        try {
            return sankeyGenerator({
                nodes: map(datum.nodes, data => assign({}, data)),
                links: map(datum.links, data => assign({}, data)),
            })
        } catch {
            return {
                nodes: [],
                links: [],
            }
        }
    }, [datum, sankeyGenerator])
    console.log('sankeyData', sankeyData)

    const [tooltipState, setTooltipState] = useState<TooltipState>({
        type: null,
        data: null,
        position: null,
    })
    const hoverTransition = () => transition().duration(ANIMATION_FAST)
    const svgRef = useRef<SVGSVGElement>(null)
    const prevWidth = useRef(cardWidth)
    const prevHeight = useRef(cardHeight)

    const isChartResized = prevWidth.current !== cardWidth || prevHeight.current !== cardHeight
    const animation = isChartResized ? 0 : ANIMATION_FAST

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

        const applyRectAttributes = (selection: NodeSelection) => {
            ;(selection as RectSelection)
                .attr('class', styles.Node)
                .attr('x', ({ x0 = 0 }) => x0)
                .attr('y', ({ y0 = 0 }) => y0)
                .attr('width', ({ x0 = 0, x1 = 0 }) => x1 - x0)
                .attr('height', ({ y0 = 0, y1 = 0 }) => y1 - y0)
                .attr('fill', data => data.color)
        }

        const applyLinkAttributes = (selection: LinkSelection) => {
            ;(selection as PathSelection)
                .attr('d', sankeyLinkHorizontal())
                .attr('class', styles.Link)
                .attr('stroke', ({ source, target }) => {
                    return settings.colorMode === SankeyDirection.SOURCE
                        ? (source as Node).color
                        : (target as Node).color
                })
                .attr('stroke-width', ({ width: linkWidth = 0 }) => Math.max(1, linkWidth))
        }

        const applyTextAttributes = (selection: LabelSelection) => {
            ;(selection as TextSelection)
                .attr('class', styles.NodeLabel)
                .attr('x', ({ x0 = 0, x1 = 0 }) => (x0 < width / 2 ? x1 + 6 : x0 - 6))
                .attr('y', ({ y0 = 0, y1 = 0 }) => (y1 + y0) / 2)
                .attr('dy', '0.35em')
                .attr('text-anchor', ({ x0 = 0 }) => (x0 < width / 2 ? 'start' : 'end'))
                .text(data => getText(data, settings.text, settings.digitCapacity, settings.format))
        }

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
                enter => enter.append('path').call(applyLinkAttributes),
                update =>
                    update.call(currentSelection => {
                        currentSelection
                            .transition(transition().duration(animation))
                            .call(applyLinkAttributes)
                    }),
                exit => exit.remove,
            )

        svg.selectAll('text')
            .data(nodes)
            .join(
                enter => enter.append('text').call(applyTextAttributes),
                update =>
                    update.call(currentSelection => {
                        currentSelection
                            .transition(transition().duration(animation).ease(easeSinOut))
                            .call(applyTextAttributes)
                    }),
                exit => exit.remove,
            )

        rect.on('mouseenter', (event, data) => {
            if (settings.needTooltip) {
                setTooltipState({
                    data,
                    type: SankeyTypeTooltip.NODE,
                    position: { x: event.pageX, y: event.pageY },
                })
            }

            link.transition(hoverTransition())
                .styleTween(
                    'stroke-opacity',
                    function (
                        this: BaseType | SVGPathElement,
                        currentLink: SankeyLink<Node, Link>
                    ): (t: number) => string {
                        const isConnected =
                            currentLink.source === data || currentLink.target === data;
                        const startOpacity =
                            parseFloat((this as SVGPathElement)?.style.strokeOpacity) ||
                            NORMAL_OPACITY;
                        const endOpacity = isConnected
                            ? HOVER_OPACITY
                            : NORMAL_OPACITY;
            
                        return function (t: number): string {
                            return interpolateNumber(startOpacity, endOpacity)(t).toString();
                        };
                    }
                )
            })
            .on('mousemove', event => {
                if (settings.needTooltip) {
                    setTooltipState(prev => ({
                        ...prev,
                        position: { x: event.pageX, y: event.pageY },
                    }))
                }
            })
            .on('mouseleave', () => {
                link.transition(hoverTransition()).style('stroke-opacity', NORMAL_OPACITY)

                if (settings.needTooltip) {
                    setTooltipState(prev => ({
                        ...prev,
                        type: null,
                        position: null,
                    }))
                }
            })

        link.on('mouseenter', function (event, data) {
            if (settings.needTooltip) {
                setTooltipState({
                    data,
                    type: SankeyTypeTooltip.LINK,
                    position: { x: event.pageX, y: event.pageY },
                })
            }

            select(this).transition(hoverTransition()).style('stroke-opacity', HOVER_OPACITY)
        })
            .on('mousemove', event => {
                if (settings.needTooltip) {
                    setTooltipState(prev => ({
                        ...prev,
                        position: { x: event.pageX, y: event.pageY },
                    }))
                }
            })
            .on('mouseleave', function () {
                if (settings.needTooltip) {
                    setTooltipState(prev => ({
                        ...prev,
                        type: null,
                        position: null,
                    }))
                }

                select(this).transition(hoverTransition()).style('stroke-opacity', NORMAL_OPACITY)
            })

        prevWidth.current = cardWidth
        prevHeight.current = cardHeight

        return () => {
            rect.on('mouseenter', null).on('mousemove', null).on('mouseleave', null)
            link.on('mouseenter', null).on('mousemove', null).on('mouseleave', null)
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
            />

            <SankeyChartLinkTooltip
                chartRef={svgRef}
                digitCapacity={settings.digitCapacity}
                format={settings.format}
                params={tooltipState}
                showTooltip={settings.showLinkTooltip}
            />
        </React.Fragment>
    )
}
