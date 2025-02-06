import { SankeyNode, SankeyLink } from 'd3-sankey'

import { Node, Link, Languages, SortingType, ColorMode, NodeAlign } from '../types'

type SortType = SankeyNode<Node, Link> | SankeyLink<Node, Link>

export const constants = {
    NODE_WIDTH: 15,
    SORTING: {
        withoutSorting: undefined,
        ascending: function (a: SortType, b: SortType): number {
            return (a.value || 0) - (b.value || 0)
        },
        descending: function (a: SortType, b: SortType): number {
            return (b.value || 0) - (a.value || 0)
        },
    },
    TOOLTIP_SEPARATE: ': ',
    ANIMATION_FAST: 500,
    MARGIN: {
        left: 5,
        top: 5,
        right: 5,
        bottom: 5,
    },
    HOVER_OPACITY: 0.8,
    NORMAL_OPACITY: 0.5,
    TEXT_OFFSET: 6,
    START: 'start',
    END: 'end',
    PERCENTAGE: 'PERCENTAGE',
    valueLabel: {
        ru: 'Значение',
        de: 'Wert',
        en: 'Value',
        tr: 'Değer',
    }
}

export const defaultSettings = {
    needTooltip: false,
    nodesSortingType: SortingType.NONE,
    linksSortingType: SortingType.NONE,
    colorMode: ColorMode.SOURCE,
    text: {
        showName: false,
        showValue: false,
    },
    nodeAlign: NodeAlign.JUSTIFY,
    showNodeTooltip: {
        name: false,
        value: false,
        incomeName: false,
        incomeValue: false,
        incomePercentage: false,
        outgoingName: false,
        outgoingValue: false,
        outgoingPercentage: false,
    },
    showLinkTooltip: {
        value: false,
        sourceName: false,
        sourcePercentage: false,
        linkName: false,
        linkPercentage: false,
    },
    lang: Languages.RU,
    tooltipColors: {
        labels: '#212121', // var(--primary-text-color)
    },
    height: 500,
    width: 900,
} as const
