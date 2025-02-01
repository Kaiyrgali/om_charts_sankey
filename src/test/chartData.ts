import { Datum } from "../sankey/types";

export const chartData = {
    "nodes": [
        {
            "name": "Сдача помещений в аренду",
            "color": "#79a4d2",
            "entityLongId": 206000000004
        },
        {
            "name": "Выручка",
            "color": "#40bf4d",
            "entityLongId": 206000000002
        },
        {
            "name": "Оказание услуг",
            "color": "#3a7872",
            "entityLongId": 206000000005
        },
        {
            "name": "Реализация продукции",
            "color": "#40b5bf",
            "entityLongId": 206000000003
        },
        {
            "name": "Займы",
            "color": "#611f93",
            "entityLongId": 206000000006
        },
        {
            "name": "Поступления",
            "color": "#87c0c5",
            "entityLongId": 206000000001
        },
        {
            "name": "Расходы",
            "color": "#93211f",
            "entityLongId": 206000000007
        },
        {
            "name": "Коммерческие",
            "color": "#931f59",
            "entityLongId": 206000000012
        },
        {
            "name": "Производственные",
            "color": "#6c6ce0",
            "entityLongId": 206000000008
        },
        {
            "name": "Управленческие",
            "color": "#bf4088",
            "entityLongId": 206000000016
        },
        {
            "name": "Реклама",
            "color": "#8dd22d",
            "entityLongId": 206000000014
        },
        {
            "name": "Командировочные",
            "color": "#cad22d",
            "entityLongId": 206000000015
        },
        {
            "name": "Заработная плата менеджеров",
            "color": "#c58d87",
            "entityLongId": 206000000013
        },
        {
            "name": "Заработная плата рабочих",
            "color": "#93501f",
            "entityLongId": 206000000010
        },
        {
            "name": "Уплата % по кредитам",
            "color": "#ac539c",
            "entityLongId": 206000000011
        },
        {
            "name": "Приобретение сырья, материалов",
            "color": "#78503a",
            "entityLongId": 206000000009
        },
        {
            "name": "Заработная плата администрации",
            "color": "#d2799a",
            "entityLongId": 206000000018
        },
        {
            "name": "Обучение персонала",
            "color": "#57bf40",
            "entityLongId": 206000000019
        },
        {
            "name": "Аренда офисных помещений",
            "color": "#3a7862",
            "entityLongId": 206000000017
        },
        {
            "name": "Прибыль",
            "color": "#49783a",
            "entityLongId": 206000000020
        }
    ],
    "links": [
        {
            "source": "Сдача помещений в аренду",
            "target": "Выручка",
            "value": 400
        },
        {
            "source": "Оказание услуг",
            "target": "Выручка",
            "value": 330
        },
        {
            "source": "Реализация продукции",
            "target": "Выручка",
            "value": 1500
        },
        {
            "source": "Займы",
            "target": "Поступления",
            "value": 350
        },
        {
            "source": "Выручка",
            "target": "Поступления",
            "value": 2030
        },
        {
            "source": "Поступления",
            "target": "Расходы",
            "value": 1280
        },
        {
            "source": "Расходы",
            "target": "Коммерческие",
            "value": 280
        },
        {
            "source": "Расходы",
            "target": "Производственные",
            "value": 930
        },
        {
            "source": "Расходы",
            "target": "Управленческие",
            "value": 270
        },
        {
            "source": "Коммерческие",
            "target": "Реклама",
            "value": 170
        },
        {
            "source": "Коммерческие",
            "target": "Командировочные",
            "value": 150
        },
        {
            "source": "Коммерческие",
            "target": "Заработная плата менеджеров",
            "value": 160
        },
        {
            "source": "Производственные",
            "target": "Заработная плата рабочих",
            "value": 440
        },
        {
            "source": "Производственные",
            "target": "Уплата % по кредитам",
            "value": 140
        },
        {
            "source": "Производственные",
            "target": "Приобретение сырья, материалов",
            "value": 550
        },
        {
            "source": "Управленческие",
            "target": "Заработная плата администрации",
            "value": 130
        },
        {
            "source": "Управленческие",
            "target": "Обучение персонала",
            "value": 120
        },
        {
            "source": "Управленческие",
            "target": "Аренда офисных помещений",
            "value": 220
        },
        {
            "source": "Поступления",
            "target": "Прибыль",
            "value": 1100
        }
    ]
} as Datum
