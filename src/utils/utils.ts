import {
    sankey,
    sankeyCenter,
    sankeyJustify,
    sankeyLeft,
    SankeyLink,
    sankeyLinkHorizontal,
    SankeyNode,
    sankeyRight,
} from 'd3-sankey'

import { constants, defaultSettings } from '../sankey/constants'
import {
    Datum,
    Link,
    Node,
    NodeAlign,
    SortingNode,
    SortingLink,
    SortingType,
    Text,
    DigitalCapacity,
    NodeSelection,
    RectSelection,
    LinkSelection,
    PathSelection,
    ColorMode,
    LabelSelection,
    TextSelection,
    SankeyGenerator,
    CustomSankeyNode,
    SankeyNodeTooltipType,
    DataType,
    LinkEventSelection,
    TooltipState,
    SankeyTypeTooltip,
} from '../sankey/types'
import { NumberFormat } from '../sankey/types'
import { Props as LinkSourcesProps } from '../sankey/tooltip/LinkSources'
import { Props as NodeSourcesProps } from '../sankey/tooltip/NodeSources'

import styles from '../sankey/Sankey.module.css'
import { BaseType, select } from 'd3-selection'
import replace from 'lodash/replace'
import assign from 'lodash/assign'
import map from 'lodash/map'
import round from 'lodash/round'
import { interpolateNumber, transition } from 'd3'

function getNodeAlign(value: NodeAlign) {
    const { CENTER, LEFT, RIGHT } = NodeAlign

    switch (value) {
        case CENTER:
            return sankeyCenter
        case LEFT:
            return sankeyLeft
        case RIGHT:
            return sankeyRight
        default:
            return sankeyJustify
    }
}

export const createSankeyGenerator = (
    nodesSortingType: SortingType = defaultSettings.nodesSortingType,
    linksSortingType: SortingType = defaultSettings.linksSortingType,
    nodeAlign: NodeAlign = defaultSettings.nodeAlign,
    cardWidth: number = defaultSettings.width,
    cardHeight: number = defaultSettings.height,
) => {
    const {
        NODE_WIDTH,
        SORTING,
        MARGIN: { left, top, right, bottom },
    } = constants

    return sankey<Node, Link>()
        .nodeId(data => data.name)
        .nodeAlign(getNodeAlign(nodeAlign))
        .nodeWidth(NODE_WIDTH)
        .extent([
            [left, top],
            [cardWidth - right, cardHeight - bottom],
        ])
        .nodeSort(SORTING[nodesSortingType] as SortingNode)
        .linkSort(SORTING[linksSortingType] as SortingLink)
}

export const hasInvalidDatum = ({ links, nodes }: Datum) => {
    return !links?.length || !nodes?.length
}

export const getText = (
    { name, value = 0 }: SankeyNode<Node, Link>,
    { showName, showValue }: Text,
    { values }:  {values: DigitalCapacity},
    format: NumberFormat,
): string => {
    if (!showName && !showValue) {
        return ''
    }

    if (!showValue) {
        return name
    }

    const formattedValue = numberFormat(format, value, values)

    return !showName ? formattedValue : `${name} (${formattedValue})`
}

export const getDataName = (text: string) => {
    return replace(text, /[()]/g, '')
}

export const emptyDatum = {
    nodes: [],
    links: [],
}

export const getAnimation = (
    prevWidthCurrent: number,
    prevHeightCurrent: number,
    cardWidth: number,
    cardHeight: number,
) => {
    const isChartResized = prevWidthCurrent !== cardWidth || prevHeightCurrent !== cardHeight

    return isChartResized ? 0 : constants.ANIMATION_FAST
}

export const applyRectAttributes = (selection: NodeSelection) => {
    ;(selection as RectSelection)
        .attr('class', styles.Node)
        .attr('x', ({ x0 = 0 }) => x0)
        .attr('y', ({ y0 = 0 }) => y0)
        .attr('width', ({ x0 = 0, x1 = 0 }) => x1 - x0)
        .attr('height', ({ y0 = 0, y1 = 0 }) => y1 - y0)
        .attr('fill', data => data.color)
}

export const applyLinkAttributes = (selection: LinkSelection, colorMode?: string) => {
    ;(selection as PathSelection)
        .attr('d', sankeyLinkHorizontal())
        .attr('class', styles.Link)
        .attr('stroke', ({ source, target }) => {
            return colorMode === ColorMode.TARGET
                ? (target as Node).color
                : (source as Node).color
        })
        .attr('stroke-width', ({ width: linkWidth = 0 }) => Math.max(1, linkWidth))
}

export const applyTextAttributes = (
    selection: LabelSelection,
    width: number,
    text: Text,
    digitCapacity: { values: DigitalCapacity },
    format: NumberFormat,
) => {
    ;(selection as TextSelection)
        .attr('class', styles.NodeLabel)
        .attr('x', ({ x0 = 0, x1 = 0 }) =>
            x0 < width / 2 ? x1 + constants.TEXT_OFFSET : x0 - constants.TEXT_OFFSET,
        )
        .attr('y', ({ y0 = 0, y1 = 0 }) => (y1 + y0) / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', ({ x0 = 0 }) => (x0 < width / 2 ? constants.START : constants.END))
        .each(function (data) {
            const label = getText(data, text, digitCapacity, format)

            select(this).text(label).attr('data-name', getDataName(label))
        })
}

export const getSankeyData = (datum: Datum, sankeyGenerator: SankeyGenerator) => {
    if (hasInvalidDatum(datum)) {
        return emptyDatum
    }

    try {
        return sankeyGenerator({
            nodes: map(datum.nodes, data => assign({}, data)),
            links: map(datum.links, data => assign({}, data)),
        })
    } catch {
        return emptyDatum
    }
}

export const getLinkSourcesText = (
    needName: boolean,
    name: string,
    needPercentage: boolean,
    value: number,
) => {
    const nameText = needName ? name : ''
    const percentage = needPercentage ? `${round(value * 100)}%` : ''
    const separate = needName && needPercentage ? constants.TOOLTIP_SEPARATE : ''

    return `${nameText}${separate}${percentage}`
}

export const getLinkSourcesParams = ({ source, target, isShow }: LinkSourcesProps) => {
    const { name: sourceName, value: sourceValue, color: sourceColor } = source as CustomSankeyNode
    const { name: targetName, value: targetValue, color: targetColor } = target as CustomSankeyNode
    const { sourceName: needSourceName, sourcePercentage, linkName, linkPercentage } = isShow

    const sourceLinkValue = sourceValue / targetValue
    const targetLinkValue = targetValue / sourceValue

    const sourceText = getLinkSourcesText(
        needSourceName,
        sourceName,
        sourcePercentage,
        sourceLinkValue,
    )
    const targetText = getLinkSourcesText(linkName, targetName, linkPercentage, targetLinkValue)

    return {
        sourceName,
        sourceColor,
        sourceText,
        targetName,
        targetColor,
        targetText,
    }
}

export const getNodeSourcesParams = (
    link: SankeyLink<Node, Link>,
    { isShow, values, format, value }: NodeSourcesProps,
) => {
    const { incomeName, incomeValue, incomePercentage } = isShow
    const nameText = getNameText(incomeName, link.source as Node)
    const valueText = getFormattedValue(incomeValue, format, link.value, values)
    const percentageText = getPercentageText(incomeValue, incomePercentage, link, value)
    const separate = getSeparate(incomeName, incomeValue || incomePercentage)

    return {
        key: getNodeKey(link.source as Node, link.index as number),
        text: getNodeText(nameText, separate, valueText, percentageText),
    }
}

export const getNodeTargetParams = (
    link: SankeyLink<Node, Link>,
    { isShow, values, format, value }: NodeSourcesProps,
) => {
    const { outgoingName, outgoingValue, outgoingPercentage } = isShow
    const nameText = getNameText(outgoingName, link.target as Node)
    const valueText = getFormattedValue(outgoingValue, format, link.value, values)
    const percentageText = getPercentageText(outgoingValue, outgoingPercentage, link, value)
    const separate = getSeparate(outgoingName, outgoingValue || outgoingPercentage)

    return {
        key: getNodeKey(link.target as Node, link.index as number),
        text: getNodeText(nameText, separate, valueText, percentageText),
    }
}

const getSeparate = (needName: boolean, needValue: boolean) => {
    return needName && needValue ? constants.TOOLTIP_SEPARATE : ''
}

const getFormattedValue = (
    needFormat: boolean,
    format: NumberFormat,
    value: number,
    values: string,
) => {
    return needFormat ? numberFormat(format, value, values) : ''
}

const getPercentageText = (
    needValue: boolean,
    needPercentage: boolean,
    link: SankeyLink<Node, Link>,
    value = 0,
) => {
    const leftParen = needValue ? '(' : ''
    const rightParen = needValue ? ')' : ''

    return needPercentage ? `${leftParen}${round((link.value / value) * 100)}%${rightParen}` : ''
}

const getNodeKey = (link: Node, index: number) => {
    return `${link.name}_${index}`
}

const getNodeText = (
    nameText: string,
    separate: string,
    valueText: string,
    percentageText: string,
) => {
    return `${nameText}${separate}${valueText} ${percentageText}`
}

const getNameText = (needName: boolean, source: Node) => {
    return needName ? source.name : ''
}

export const getNodeValueParams = (
    format: NumberFormat,
    values: string,
    name: string,
    isShow: SankeyNodeTooltipType,
    value = 0,
) => {
    const { name: isShowName, value: isShowValue } = isShow
    const nameText = isShowName ? name : ''
    const valueText = getFormattedValue(isShowValue, format, value, values)
    const separate = getSeparate(isShowName, isShowValue)

    return `${nameText}${separate}${valueText}`
}

export const needSkipTooltip = (data: DataType, showTooltip: SankeyNodeTooltipType): boolean => {
    const { sourceLinks, targetLinks } = data as SankeyNode<Node, Link>
    const {
        name: showName,
        value: showValue,
        incomeName,
        incomeValue,
        incomePercentage,
        outgoingName,
        outgoingValue,
        outgoingPercentage,
    } = showTooltip
    const skipSourceTooltip =
        !targetLinks?.length &&
        !(showName || showValue || outgoingName || outgoingValue || outgoingPercentage)
    const skipTargetTooltip =
        !sourceLinks?.length &&
        !(showName || showValue || incomeName || incomeValue || incomePercentage)

    return skipSourceTooltip || skipTargetTooltip
}

const hoverTransition = () => transition().duration(constants.ANIMATION_FAST)

export const addSankeyEventListeners = (
    rect: RectSelection,
    link: LinkEventSelection,
    setTooltipState: React.Dispatch<React.SetStateAction<TooltipState>>,
    needTooltip: boolean,
) => {
    if (!rect || !link) {
        return
    }

    rect.on('mouseenter', (event, data) => {
        if (needTooltip) {
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
                ): (_time: number) => string {
                    const isConnected =
                        currentLink.source === data || currentLink.target === data
                    const startOpacity =
                        parseFloat((this as SVGPathElement)?.style.strokeOpacity) ||
                        constants.NORMAL_OPACITY
                    const endOpacity = isConnected
                        ? constants.HOVER_OPACITY
                        : constants.NORMAL_OPACITY
                        
                    return function (_time: number): string {
                        return interpolateNumber(startOpacity, endOpacity)(_time).toString()
                    }
                }
            )
    })
        .on('mousemove', event => {
            if (needTooltip) {
                setTooltipState(prev => ({
                    ...prev,
                    position: { x: event.pageX, y: event.pageY },
                }))
            }
        })
        .on('mouseleave', () => {
            link.transition(hoverTransition()).style('stroke-opacity', constants.NORMAL_OPACITY)

            if (needTooltip) {
                setTooltipState(prev => ({
                    ...prev,
                    type: null,
                    position: null,
                }))
            }
        })

    link.on('mouseenter', function (event, data) {
        if (needTooltip) {
            setTooltipState({
                data,
                type: SankeyTypeTooltip.LINK,
                position: { x: event.pageX, y: event.pageY },
            })
        }

        select(this).transition(hoverTransition()).style('stroke-opacity', constants.HOVER_OPACITY)
    })
        .on('mousemove', event => {
            if (needTooltip) {
                setTooltipState(prev => ({
                    ...prev,
                    position: { x: event.pageX, y: event.pageY },
                }))
            }
        })
        .on('mouseleave', function () {
            if (needTooltip) {
                setTooltipState(prev => ({
                    ...prev,
                    type: null,
                    position: null,
                }))
            }

            select(this)
                .transition(hoverTransition())
                .style('stroke-opacity', constants.NORMAL_OPACITY)
        })
}

export const destroySankeyEventListeners = (rect: RectSelection, link: LinkEventSelection) => {
    if (!rect || !link) {
        return
    }

    rect.on('mouseenter', null).on('mousemove', null).on('mouseleave', null)
    link.on('mouseenter', null).on('mousemove', null).on('mouseleave', null)
}

// TODO принимать форматирование аргументом
export function numberFormat(format: NumberFormat, number: number, digitCapacityType: string) {

    console.log(format, digitCapacityType)
    return `${number}`
    // if (!isNumber(number)) {
    //     return null
    // }

    // if (!isNumberFormat(format)) {
    //     return number
    // }

    // const { PERCENTAGE } = constants
    // const isPercentage = format.unitsType === PERCENTAGE

    // const absNumber = Math.abs(number)
    // const isLessMillion = absNumber < 1000000
    // const isLessThousand = absNumber < 1000

    // const roundedMillion = isLessMillion
    //     ? round(number / 1000000, 3)
    //     : round(number / 1000000, 1)

    // const roundedThousand = isLessThousand
    //     ? round(number / 1000, 3)
    //     : round(number / 1000, 1)

    // if (digitCapacityType === DigitalCapacity.KILO) {
    //     const symbol = isPercentage ? 'K %' : 'K'
    //     const value = isPercentage ? round(roundedThousand * 100, 3) : roundedThousand

    //     return `${formatSeparators(format, value)}${symbol}`
    // }

    // if (digitCapacityType === DigitalCapacity.MEGA) {
    //     const symbol = isPercentage ? 'M %' : 'M'
    //     const value = isPercentage ? round(roundedMillion * 100, 3) : roundedMillion

    //     return `${formatSeparators(format, value)}${symbol}`
    // }

    // return this.formatter.format(format, number)
}

// function isNumberFormat(format?: NumberFormat): format is NumberFormat {
//     return format?.dataType === 'NUMBER'
// }

// export const formatSeparators = (rules: NumberFormat, value: NumberValue): string => {
//     const { decimal = '', integer } = parse(`${value}`)
//     const { displayPercentagesInShares } = rules
//     const maximumFractionDigits = 20
//     const separators = {
//         FULL_STOP: '.',
//         COMMA: ',',
//         SPACE: ' ',
//         NONE: '',
//     }
//     const groupingSeparator = separators[rules.groupingSeparator]
//     const decimalSeparator = separators[rules.decimalSeparator]

//     let [leftSide, rightSide = ''] = parseFloat(`${integer}.${decimal}`)
         
//         .toLocaleString('ru-RU', {
//             minimumFractionDigits:
//                 decimal.length > maximumFractionDigits ? maximumFractionDigits : decimal.length,
//         })
//         .split(',')

//     leftSide = leftSide.replace(
//         /\s+/g,
//         rules.groupingSeparator === 'NONE' ? '' : groupingSeparator || separators.COMMA,
//     )

//     if (
//         rules.negativeNumberNotation === NegativeType.BRACKETS &&
//         parseFloat(leftSide) < 0.9 &&
//         leftSide !== '0'
//     ) {
//         leftSide = leftSide.replace('-', '')
//         leftSide = `(${leftSide}${rightSide && decimalSeparator}${rightSide})`
//         rightSide = ''
//     }

//     let result = [leftSide, rightSide].join(
//         rightSide.length > 0 ? decimalSeparator || separators.FULL_STOP : '',
//     )

//     result = formatZeroFormat(rules, result)

//     if (isPercentageFormat(rules) && !displayPercentagesInShares) {
//         if (result == '-' || _.isEmpty(result)) {
//             return result
//         }

//         return `${result}%`
//     }

//     if (!decimal.length || !_.size(decimalSeparator)) {
//         return result
//     }

//     const { decimal: rightPart, integer: leftPart } = parse(result, decimalSeparator)

//     if (rightPart) {
//         const formattedRightPart = _.map(rightPart, (symbol, index) => {
//             return decimal[index] || symbol
//         })

//         return `${leftPart}${decimalSeparator}${formattedRightPart.join('')}`
//     }

//     return result
// }

// const parse = (value: string, separator = '.') => {
//     if (value.includes(separator)) {
//         const decimal = _.last(value.split(separator))
//         const [integer] = value.split(`${separator}${decimal}`)

//         return { integer, decimal }
//     }

//     return {
//         integer: value,
//         decimal: '',
//     }
// }
