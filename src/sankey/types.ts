import {
    SankeyLinkMinimal,
    SankeyNodeMinimal,
    SankeyNode,
    SankeyLink,
    SankeyLayout,
    SankeyGraph,
} from 'd3-sankey'
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

export interface Datum {
    nodes: Node[]
    links: Link[]
}

// TODO убрать Sankey
export enum SankeyTypeTooltip {
    NODE = 'node',
    LINK = 'link',
}

export interface Settings {
    needTooltip?: boolean
    digitCapacity?: { values: DigitalCapacity }
    format?: NumberFormat
    nodesSortingType?: SortingType
    linksSortingType?: SortingType
    colorMode?: ColorMode
    text?: Text
    nodeAlign?: NodeAlign
    showNodeTooltip?: SankeyNodeTooltipType
    showLinkTooltip?: SankeyLinkTooltipType
    lang?: Languages
    tooltipColors?: TooltipColors
}

export interface Text {
    showName: boolean
    showValue: boolean
}

interface TooltipColors {
    labels: string
    linkText: string
    decrementColor: string
    incrementColor: string
}

export enum Languages {
    RU = 'ru',
    EN = 'en',
    DE = 'de',
    TR = 'tr',
}

export enum NodeAlign {
    LEFT = 'sankeyLeft',
    RIGHT = 'sankeyRight',
    CENTER = 'sankeyCenter',
    JUSTIFY = 'sankeyJustify',
}
export enum ColorMode {
    SOURCE = 'source',
    TARGET = 'target',
}

type RectTransition = Transition<SVGRectElement, SankeyNode<Node, Link>, BaseType, unknown>

export type RectSelection = Selection<SVGRectElement, SankeyNode<Node, Link>, BaseType, unknown>

export type NodeSelection = RectSelection | RectTransition

type PathTransition = Transition<BaseType, SankeyLink<Node, Link>, BaseType, unknown>

export type LinkEventSelection = Selection<
    BaseType | SVGPathElement,
    SankeyLink<Node, Link>,
    SVGSVGElement,
    unknown
>

export type PathSelection = Selection<SVGPathElement, SankeyLink<Node, Link>, BaseType, unknown>

export type LinkSelection = PathSelection | PathTransition

export type TextSelection = Selection<SVGTextElement, SankeyNode<Node, Link>, BaseType, unknown>

type TextTransition = Transition<BaseType, SankeyNode<Node, Link>, BaseType, unknown>

export type LabelSelection = TextSelection | TextTransition

export type SVG = Selection<SVGSVGElement, unknown, null, undefined>

// TODO разобраться с подчеркиванием типов
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
    data: DataType
    position: { x: number; y: number } | null
}

export type DataType = SankeyNode<Node, Link> | (Link & SankeyLinkMinimal<Node, Link>) | null

export interface TooltipProps {
    chartRef: React.RefObject<SVGSVGElement>
    format?: NumberFormat
    digitCapacity?: { values: string }
    params: TooltipState
    showTooltip?: SankeyNodeTooltipType | SankeyLinkTooltipType
    colors?: TooltipColors 
}

export type SankeyGenerator = SankeyLayout<SankeyGraph<Node, Link>, Node, Link>

export type LinkSource = string | (string & CustomSankeyNode)

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

export const enum SortingType {
    NONE = 'withoutSorting',
    ASC = 'ascending',
    DESC = 'descending',
}

