import { SankeyNode, SankeyLink } from 'd3-sankey'

import { Node, Link } from './types'

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
    // TODO выделить в глобальные константы
    PERCENTAGE: 'PERCENTAGE',
    valueLabel: {
        ru: 'Значение',
        de: 'Wert',
        en: 'Value',
        tr: 'Değer',
    }
}
