import { sankey, sankeyCenter, sankeyJustify, sankeyLeft, SankeyNode, sankeyRight } from 'd3-sankey'

// import isNumber from 'lodash/isNumber'
// import round from 'lodash/round'

import { constants } from '../sankey/constants'
import {
    SankeyDatum,
    Link,
    Node,
    SankeyNodeAlign,
    SankeySettings,
    SortingNode,
    SortingLink,
    SortingType,
    // DigitalCapacity,
} from '../sankey/types'
import { NumberFormat } from '../sankey/types'

function getNodeAlign(value: SankeyNodeAlign) {
    const { CENTER, LEFT, RIGHT } = SankeyNodeAlign

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
    nodesSortingType: SortingType = 'withoutSorting',
    linksSortingType: SortingType = 'withoutSorting',
    nodeAlign = SankeyNodeAlign.JUSTIFY,
    cardWidth: number,
    cardHeight: number,
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

export const hasInvalidDatum = ({ links, nodes }: SankeyDatum) => {
    return !links?.length || !nodes?.length
}

export const getText = (
    { name, value = 0 }: SankeyNode<Node, Link>,
    { showName, showValue }: SankeySettings['text'],
    { values }: SankeySettings['digitCapacity'],
    format: SankeySettings['format'],
) => {
    if (!showName && !showValue) {
        return ''
    }

    if (!showValue) {
        return name
    }

    const formattedValue = numberFormat(format, value, values)

    return !showName ? formattedValue : `${name} (${formattedValue})`
}

// TODO надо решить вопрос с форматированием
// если в MW будет дополняться форматирование, то надо будет всегда в графики лесть и там тоже что-то менять
// перенести в общую библиотеку
export function numberFormat(format: NumberFormat, number: number, digitCapacityType: string) {

    console.log(format, digitCapacityType)
    return number
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
