import { SankeyLinkMinimal, SankeyNodeMinimal, SankeyNode, SankeyLink } from 'd3-sankey'
import { BaseType, Selection } from 'd3-selection'
import { Transition } from 'd3-transition'


export type CustomSankeyNode = Node & Required<SankeyNodeMinimal<Node, Link>>
export type CustomSankeyLink = Link & Required<SankeyLinkMinimal<Node, Link>>

export interface Node {
    name: string
    color: string
    entityLongId: number
}

export interface Link {
    source: string
    target: string
    value: number
}

export interface SankeyDatum {
    nodes: Node[]
    links: Link[]
}

export enum SankeyTypeTooltip {
    NODE = 'node',
    LINK = 'link',
}

export interface SankeySettings {
    needTooltip: boolean
    direction: { source: number; target: number }
    digitCapacity: { values: DigitalCapacity }
    valuesFrom?: number
    format: NumberFormat
    nodesSortingType: SortingType
    linksSortingType: SortingType
    colorMode: string
    text: {
        showName: boolean
        showValue: boolean
    }
    nodeAlign: SankeyNodeAlign
    showNodeTooltip: SankeyNodeTooltipType
    showLinkTooltip: SankeyLinkTooltipType
    lang?: Languages
}

export enum Languages {
    RU = 'ru',
    EN = 'en',
    DE = 'de',
    TR = 'tr',
}

export enum SankeyNodeAlign {
    LEFT = 'sankeyLeft',
    RIGHT = 'sankeyRight',
    CENTER = 'sankeyCenter',
    JUSTIFY = 'sankeyJustify',
}
export enum SankeyDirection {
    SOURCE = 'source',
    TARGET = 'target',
}

type RectTransition = Transition<SVGRectElement, SankeyNode<Node, Link>, BaseType, unknown>

export type RectSelection = Selection<SVGRectElement, SankeyNode<Node, Link>, BaseType, unknown>

export type NodeSelection = RectSelection | RectTransition

type PathTransition = Transition<BaseType, SankeyLink<Node, Link>, BaseType, unknown>

export type PathSelection = Selection<SVGPathElement, SankeyLink<Node, Link>, BaseType, unknown>

export type LinkSelection = PathSelection | PathTransition

export type TextSelection = Selection<SVGTextElement, SankeyNode<Node, Link>, BaseType, unknown>

type TextTransition = Transition<BaseType, SankeyNode<Node, Link>, BaseType, unknown>

export type LabelSelection = TextSelection | TextTransition

export type SVG = Selection<SVGSVGElement, unknown, null, undefined>

export type SortingNode = (
    a: SankeyNode<Node, Link>,
    b: SankeyNode<Node, Link>,
) => number | null | undefined

export type SortingLink = (
    a: SankeyLink<Node, Link>,
    b: SankeyLink<Node, Link>,
) => number | null | undefined

export interface TooltipState {
    type: SankeyTypeTooltip | null
    data: SankeyNode<Node, Link> | (Link & SankeyLinkMinimal<Node, Link>) | null
    position: { x: number; y: number } | null
}

export interface TooltipProps {
    chartRef: React.RefObject<SVGSVGElement>
    format: NumberFormat
    digitCapacity: { values: string }
    params: TooltipState
    showTooltip: SankeyNodeTooltipType | SankeyLinkTooltipType
}

export type SankeyNodeTooltipType = {
    name: boolean
    value: boolean
    incomeName: boolean
    incomeValue: boolean
    incomePercentage: boolean
    outgoingName: boolean
    outgoingValue: boolean
    outgoingPercentage: boolean
}
export type SankeyLinkTooltipType = {
    value: boolean
    sourceName: boolean
    sourcePercentage: boolean
    linkName: boolean
    linkPercentage: boolean
}

export interface NumberFormat {
    dataType: 'NUMBER'
    unitsType?: 'PERCENTAGE'
}

export enum DigitalCapacity {
    NO = 'NO',
    KILO = 'KILO',
    MEGA = 'MEGA',
}

export type SortingType = 'withoutSorting' | 'ascending' | 'descending'

