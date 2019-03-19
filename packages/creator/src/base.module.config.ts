export default {
    'nodeConfig': {
        'direction': {
            'type': 'radio',
            'text': '布局方向',
            'extra': [{
                'text': 'X轴',
                'value': 'x'
            }, {
                'text': 'Y轴',
                'value': 'y'
            }]
        },
        'position': {
            'type': 'radio',
            'text': '元素浮动',
            'extra': [{
                'text': '相对定位',
                'value': 'relative'
            }, {
                'text': '绝对定位',
                'value': 'absolute'
            }]
        },
        'width': {
            'type': 'size',
            'text': '宽',
            'extra': {
                'min': 1,
                'max': 320
            }
        },
        'height': {
            'type': 'size',
            'text': '高',
            'extra': {
                'min': 1,
                'max': 3600
            }
        },
        'x': {
            'type': 'size',
            'text': 'X轴位移',
            'extra': {
                'min': 0,
                'max': 320
            }
        },
        'y': {
            'type': 'size',
            'text': 'Y轴位移',
            'extra': {
                'min': 0,
                'max': 3600
            }
        },
        'fontSize': {
            'type': 'size',
            'text': '字体大小',
            'extra': {
                'min': 12,
                'max': 72
            }
        },
        'textAlign': {
            'type': 'radio',
            'text': '文字对齐',
            'extra': [{
                'text': '左对齐',
                'value': 'left'
            }, {
                'text': '居中',
                'value': 'center'
            }, {
                'text': '右对齐',
                'value': 'right'
            }]
        },
        'backgroundColor': {
            'type': 'color',
            'text': '背景颜色'
        },
        'color': {
            'type': 'color',
            'text': '颜色'
        },
        'bgImg': {
            'type': 'image',
            'text': '背景图片'
        }
    }
}
