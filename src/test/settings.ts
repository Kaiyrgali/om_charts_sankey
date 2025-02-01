import { Settings } from '../sankey/types'


export const settings = {
    'colors': {
        '206000000004': '#79a4d2'
    },
    'needTooltip': true,
    'digitCapacity': {
        'values': 'NO'
    },
    'direction': {
        'source': 204000000002,
        'target': 204000000003
    },
    'valuesFrom': 204000000004,
    'format': {
        'dataType': 'NUMBER',
    },
    'nodesSortingType': 'withoutSorting',
    'linksSortingType': 'withoutSorting',
    'colorMode': 'source',
    'text': {
        'showName': true,
        'showValue': true,
        'showPercentage': true
    },
    'showNodeTooltip': {
        'name': true,
        'value': true,
        'incomeName': true,
        'incomeValue': true,
        'incomePercentage': true,
        'outgoingName': true,
        'outgoingValue': true,
        'outgoingPercentage': true
    },
    'showLinkTooltip': {
        'value': true,
        'sourceName': true,
        'sourcePercentage': true,
        'linkName': true,
        'linkPercentage': true
    },
    'nodeAlign': 'sankeyLeft'
} as Settings