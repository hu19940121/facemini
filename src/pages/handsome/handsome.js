import Taro, { Component } from '@tarojs/taro'
import { View, Button,Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { judgeGender,judgeExpression } from './judge'
import http  from '../../service/http'
import qiniuUploader from '../../utils/qiniuUploader'
import './handsome.scss'
import bgImage from './images/yanzhifenbg.png'
import tiezhi from './images/tiezhi.png'
import page_down from './images/page_down.png'

let timer = null
@inject('imageStore','commonStore')
@observer
class Handsome extends Component {
  constructor (props) {
    super(props)
    this.state= {
      top: -380,
      faceInfo: {
        gender:{},
        face_shape:{},
        expression:{},
      },
      isface: true,
      scanning: true,
      userInfo:{}
    }
  }
  config = {
    navigationBarTitleText: '颜值测试',
    navigationBarBackgroundColor: '#8526fb',
  }
  componentDidMount () {
    const userInfo = Taro.getStorageSync('userInfo')
    this.setState({
      userInfo
    })
    // const { imageStore: { image } } = this.props
  }
  upLoadImg = ()=> {
    const { commonStore: { imgBucketUrl,imgToken }, imageStore } = this.props
    Taro.chooseImage().then(res=>{
      qiniuUploader.upload(res.tempFilePaths[0], (respic) => {
        imageStore.setImage(respic.imageURL)
      }, (error) => {
        console.log('error: ' + error);
      }, {
        region: 'SCN',
        domain: imgBucketUrl, //如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
        uptoken: imgToken, // 由其他程序生成七牛 uptoken
      });      
    })
  }
  imageOnload = () => {
    const { imageStore: { image } } = this.props
    this.setState({scanning: true})
    this.startScan()
    http.get('api/v1/faceAPI',{ image }).then(res=>{
      console.log('res',res);
      this.endScan()
      if (res.data) {
        this.setState({
          faceInfo: res.data.face_list[0],
          isface: true,
          scanning: false,
          faceImg:res.data.faceImg
        })
      } else {
        this.setState({
          isface: false
        })
      }
    })
  }
  // 开始扫描
  startScan() {
    let { top } = this.state
    timer = setInterval(()=>{
      top = top + 1
      if (top === 0) {
        top = -380
        this.setState({
          top
        })
      }
      this.setState({
        top
      })
    },5)
  }
  //结束扫描
  endScan() {
    clearInterval(timer)
    this.setState({
      top:-380
    })
  }

  render () {
    const { imageStore: { image } } = this.props
    const { top,faceInfo, isface, scanning,faceImg,userInfo } = this.state    
    return (
      <View className='handsome'>
        <View className={`scan-wrapper ${ scanning ? "" : "hidden" }`}>
          <View className='scan' style={'top:' + Taro.pxTransform(top)}></View>
          <Image  src={image} onLoad={this.imageOnload} className='scan-image'>
          </Image>
        </View>
        <View className={`${  !scanning? "" : "hidden" }`}>
          <View className={`result-wrapper ${  isface? "" : "hidden" }`}>
            <Image  src={bgImage} className='bg-image'></Image>
            <View className='facecontainer'>
              <Image  src={faceImg} className='face'></Image>
            </View>
            <Image  src={tiezhi} className='tiezhi'>
            </Image>
            <View className='fenzhi'>
              {faceInfo.beauty}分
            </View>
            <View className='result-wrapper'>
              <View className='result'>
                <View className='result-left'>
                  <Text className='tit'>用户</Text>：{userInfo.nickName}
                </View>
                <View className='result-right'>
                  <Text className='tit'>年龄</Text>：{faceInfo.age}
                </View>
              </View>
              <View className='result'>
                <View className='result-left'>
                  <Text className='tit'>表情</Text>：{ judgeExpression(faceInfo.expression.type) }
                </View>
                <View className='result-right'>
                  <Text className='tit'>性别</Text>：{judgeGender(faceInfo.gender.type)}
                </View>
              </View>
            </View>
            <View className='page_down'>
              <Image src={page_down}  className='page_down_img'></Image>
              <View className='tips-wrapper'>
                <Button className='restart-btn' onClick={this.upLoadImg}>
                  重新测试
                </Button>
                <Text>重新测一次可能更美哦~</Text>
              </View>

            </View>
            {/* <View>
              <View>年龄： { faceInfo.age }</View>
              <View>性别: { judgeGender(faceInfo.gender.type) } ；可信度 { faceInfo.gender.probability }</View>
              <View>颜值：{ faceInfo.beauty }</View>
              <View>表情：{ judgeExpression(faceInfo.expression.type) } ；可信度：{ faceInfo.expression.probability }</View>
              <View>脸型：{ judgeFaceShape(faceInfo.face_shape.type) } ；可信度：{ faceInfo.face_shape.probability }</View>
            </View> */}
          </View>
        </View>
        <View className={`result-wrapper ${ isface ? "hidden" : "" }`}>
          未检测到人脸
        </View>
      </View>
    )
  }
}

export default Handsome 
