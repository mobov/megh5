import BUTTON_BG from './assets/btn.png'
import { ProjectData } from '@megh5/ui/types/core/constants'

const PreviewData: ProjectData = {
  name: 'testproject',
  version: '0.0.1',
  dependencies: [{
    '@megmore/es-helper': '^0.0.24'
  }, {
    '@megmore/scss-helper': '^0.0.4'
  }, {
    '@megmore/vui': '^0.0.2',
    'imports': ['HView', 'HButton', 'HFooter']
  }],
  mainPath: '0/0',
  UiNodes: [{
    name: 'HApp',
    path: '0/',
    nodeData: {
      props: {
        width: '100%',
        height: '100%',
        x: 0,
        y: 0
      }
    },
    children: [{
      name: 'HView',
      path: '0/0',
      nodeData: {
        props: {
          width: '100%',
          height: '100%',
          x: 0,
          y: 0
        }
      },
      children: [{
        name: 'HButton',
        path: '0/0/0',
        nodeData: {
          style: {
            color: 'white'
          },
          props: {
            width: 100,
            height: 50,
            x: 0,
            y: 0,
            bgSrc: BUTTON_BG,
            text: '哈哈哈'
          }
        }
      }, {
        name: 'HButton',
        path: '0/0/1',
        nodeData: {
          style: {
            color: 'white'
          },
          props: {
            width: 100,
            height: 50,
            x: 10,
            y: 200,
            bgSrc: BUTTON_BG,
            text:  '嗯嗯嗯'
          }
        }
      }, {
        name: 'HPromoCode',
        path: '0/0/2',
        nodeData: {
          style: {
            color: 'white'
          },
          props: {
            width: 300,
            height: 50,
            x: 0,
            y: 0,
            bgSrc: 'data:image/png;base64,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',
          }
        }
      }]
    }, {
      name: 'HFooter',
      path: '0/1',
      nodeData: {
        props: {
          width: '100%',
          height: 100,
          x: 0,
          y: 0,
          logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABD8AAACpCAMAAAAbZ2YxAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA8UExURUxpcfeUHfeUHfeUHfeUHfeUHfeUHf////////////eUHfeUHfeUHf////////////////////eUHf///21+i7oAAAASdFJOUwBgENBAwICAQMCgkDBgoCBw8JLDaKMAAAUISURBVHja7dXtVoJAGIVRpjJw1Ozj/u+1/7VWYwdRRva5AOCtnt3w1cnGYc7GXs6cdeV56mSzrhyOu/Yajzi0n1AW/4i/1s3fKz8ex49tXDm8fLbXeMSu/YTXxT+CH/zgBz/4wQ9+8IMf/OAHP/jBD364kh/84Ac/+MEPfvCDH/zgBz/4wQ9+KIsf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/44Up+8IMf/OAHP/jBD37wgx/84Ac/+KEsfvCDH/xwJT/4wQ9+8IMf/OAHP/jBD37wgx/8UBY/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/jBD37ww5X84Ac/+MEPfvCDH/zgBz/4wQ9+8ENZ/OAHP/jBD37wgx/84Ac/fu59Wnqr8GPxK9/4wY+b7YKo9ld4zSVhLX7rKvxY/MpVfMQDjB/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP4wf/OjFjw9+8IMf/AjT3fODH/zgBz/4wQ9+8MP4wQ9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/jBD37wgx/GD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMfxg9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/ixVT9O+052dz8O/OAHP4IXrGJ392Oo/OAHP/iRplv5wQ9+8CNNt/KDH/zgR5pu5Qc/+MGPNN3KD37wgx9pupUf/OAHP9J0Kz/4wQ9+pOlWfvCDH/xI0z3wgx/84EeabuEHP/jBjzTdwg9+8IMfabqFH/zgBz/SdAs/+MEPfqTpFn7wgx/8SNMt/OAHP/iRplv4wQ9+8CNNt/CDH/zgR5pu4Qc/+MGPNN3CD37wgx9puoUf/OAHP9J0Cz/4wQ9+pOkWfvCDH/xI0y384Ac/+JGmW/jBD37wY5gNCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/8+HXluIZ14EcXH8EPftzWj3Hof/zgBz/4wQ9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz+268cqxo+rvOBtWsMeIN2nZ37wY3N+rGOP8K//AkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac//gPIjh/84Ac/0lV+8IMf/JgPCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIBswY+xk03zfpjtF5yW/41ecCY/2jvu2hs2v/NN/uS/AavXS1yVdkuvAAAAAElFTkSuQmCC',
          termsText: 'Terms Of Service',
          termsLink: 'http://www.onemt.com/abroadgame/outer/terms',
          policyText: 'Privacy Policy',
          policyLink: 'http://www.onemt.com/abroadgame/outer/policy',
          copyright: 'Copyright 2019 onemt Limited All right reserved'
        },
        style: {
          color: 'white'
        },
        slot: 'footer'
      }
    }]
  }]
}

export default PreviewData