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
          y: 0,
          fontColor: '#000000',
          bgColor: 'transparent',
          bgImg: ''
        }
      },
      children: [{
        name: 'HButton',
        path: '0/0/0',
        nodeData: {
          props: {
            width: 100,
            height: 50,
            x: 0,
            y: 0,
            text: '哈哈哈',
            fontColor: '#ffffff',
            bgColor: '#000000',
            bgImg: ''
          }
        }
      }, {
        name: 'HButton',
        path: '0/0/1',
        nodeData: {
          props: {
            width: 100,
            height: 50,
            x: 10,
            y: 0,
            text: '嗯嗯呢',
            fontColor: '#ffffff',
            bgColor: 'transparent',
            bgImg: BUTTON_BG
          }
        }
      }, {
        name: 'HPromoCode',
        path: '0/0/2',
        nodeData: {
          props: {
            width: 300,
            height: 50,
            x: 0,
            y: 0
          }
        }
      }, {
        name: 'HView',
        path: '0/0/3',
        nodeData: {
          props: {
            width: 300,
            height: 50,
            x: 0,
            y: 0,
            fontColor: '#000000',
            bgColor: 'transparent',
            bgImg: ''
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
          termsLink: {
            text: 'Terms Of Service',
            href: 'http://www.onemt.com/abroadgame/outer/terms',
          },
          policyLink: {
            text: 'Privacy Policy',
            href: 'http://www.onemt.com/abroadgame/outer/policy',
          },
          copyright: 'Copyright 2019 onemt Limited All right reserved'
        },
        slot: 'footer'
      }
    }]
  }]
}

export default PreviewData
