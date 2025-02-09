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

export interface BaseNode {
    name: string
    color?: string
}

export interface Link {
    source: string
    target: string
    value: number
}

export interface SankeyDatum {
    nodes: BaseNode[]
    links: Link[]
}

export interface Node extends BaseNode {
    color: string;
}

export interface Datum {
    nodes: Node[]
    links: Link[]
}

export enum TooltipType {
    NODE = 'node',
    LINK = 'link',
}

export interface Settings {
    colorMode?: ColorMode
    lang?: Languages
    nodeAlign?: NodeAlign
    needTooltip?: boolean
    nodesSortingType?: SortingType
    linksSortingType?: SortingType
    showLinkTooltip?: SankeyLinkTooltipType
    showNodeTooltip?: SankeyNodeTooltipType
    tooltipColors?: TooltipColors
    text?: Text
    numberFormatter?: NumberFormatter
}

export type NumberFormatter = undefined | ((value: number) => string)

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

type RectTransition = Transition<
    SVGRectElement,
    SankeyNode<Node, Link>,
    BaseType,
    unknown
>

export type RectSelection = Selection<
    SVGRectElement,
    SankeyNode<Node, Link>,
    BaseType,
    unknown
>

export type NodeSelection = RectSelection | RectTransition

type PathTransition = Transition<
    BaseType,
    SankeyLink<Node, Link>,
    BaseType,
    unknown
>

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

export type SortingNode = (
    a: SankeyNode<Node, Link>,
    b: SankeyNode<Node, Link>,
) => number | null | undefined

export type SortingLink = (
    a: SankeyLink<Node, Link>,
    b: SankeyLink<Node, Link>,
) => number | null | undefined

export interface TooltipState {
    type: TooltipType | null
    data: DataType
    position: { x: number; y: number } | null
}

export type DataType = SankeyNode<Node, Link> | (Link & SankeyLinkMinimal<Node, Link>) | null

export interface TooltipProps {
    chartRef: React.RefObject<SVGSVGElement>
    numberFormatter: NumberFormatter
    params: TooltipState
    showTooltip: SankeyNodeTooltipType | SankeyLinkTooltipType
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

export const enum SortingType {
    NONE = 'withoutSorting',
    ASC = 'ascending',
    DESC = 'descending',
}

export interface ChartDimensions {
    width?: number
    height?: number
}

export type DefaultSettings =
    Required<Omit<Settings, 'tooltipColors' | 'numberFormatter'>> &
    Required<ChartDimensions>
