import { SankeySettings } from "./types";

export const settings = {
    "colors": {
        "206000000004": "#79a4d2"
    },
    "needTooltip": true,
    "digitCapacity": {
        "values": "NO"
    },
    "direction": {
        "source": 204000000002,
        "target": 204000000003
    },
    "valuesFrom": 204000000004,
    "format": {
        "dataType": "NUMBER",
        // "minimumSignificantDigits": -1,
        // "decimalPlaces": -1,
        // "decimalSeparator": "FULL_STOP",
        // "groupingSeparator": "SPACE",
        // "negativeNumberNotation": "MINUS_SIGN",
        // "zeroFormat": "ZERO",
        // "unitsType": "NONE",
        // "unitsDisplayType": "NONE",
        // "currencyCode": null,
        // "customUnits": null,
        // "comparisonIncrease": "GOOD",
        // "nanApplied": false,
        // "nanDisplayValue": "NaN",
        // "hasRounding": true,
        // "maximumSignificantAllDigits": -1,
        // "maximumSignificantIntegerDigits": -1,
        // "maximumSignificantDecimalDigits": -1,
        // "horizontalAlign": "RIGHT",
        // "verticalAlign": "CENTER",
        // "inputFormatSettingApplied": false,
        // "sendFormatSettingApplied": false,
        // "insignificantIntegerRanks": -1,
        // "significantDecimalRanks": 2,
        // "savingFormatSettingApplied": false,
        // "savingFormatSettings": {
        //     "decimalPlaces": 15
        // }
    },
    "nodesSortingType": "withoutSorting",
    "linksSortingType": "withoutSorting",
    "colorMode": "source",
    "text": {
        "showName": true,
        "showValue": true,
        "showPercentage": true
    },
    "showNodeTooltip": {
        "name": true,
        "value": true,
        "incomeName": true,
        "incomeValue": true,
        "incomePercentage": true,
        "outgoingName": true,
        "outgoingValue": true,
        "outgoingPercentage": true
    },
    "showLinkTooltip": {
        "value": true,
        "sourceName": true,
        "sourcePercentage": true,
        "linkName": true,
        "linkPercentage": true
    },
    "nodeAlign": "sankeyLeft"
} as SankeySettings