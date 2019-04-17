import Taro, { Component } from '@tarojs/taro'
import { View, Button,Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { judgeGender, judgeFaceShape,judgeExpression } from './judge'
import http  from '../../service/http'
import './handsome.scss'

let timer = null
@inject('imageStore')
@observer
class Handsome extends Component {
  constructor (props) {
    super(props)
    this.state= {
      top: -380,
      faceInfo: {
        gender:{},
        face_shape:{},
        expression:{}
      },
      isface: true
    }
  }
  config = {
    navigationBarTitleText: '颜值',
  }
  componentDidMount () {
    // const { imageStore: { image } } = this.props
  }
  imageOnload = () => {
    const params = this.$router.params;
    console.log('formid-----------------------params',params);
    const { imageStore: { image } } = this.props
    this.startScan()
    http.get('api/v1/faceAPI',{ image,form_id:params.formId }).then(res=>{
      console.log('res',res);
      this.endScan()
      if (res.data) {
        this.setState({
          faceInfo: res.data.face_list[0],
          isface: true
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
    const { top,faceInfo, isface } = this.state
    return (
      <View className='handsome'>
        <View className='scan-wrapper'>
          <View className='scan' style={'top:' + Taro.pxTransform(top)}></View>
          <Image  src={image} onLoad={this.imageOnload} className='scan-image'>
          </Image>
        </View>
        <View className={`result-wrapper ${ isface ? "" : "hidden" }`}>
          <View className={faceInfo.age ? '' : 'hidden'}>
            <View>年龄： { faceInfo.age }</View>
            <View>性别: { judgeGender(faceInfo.gender.type) } ；可信度 { faceInfo.gender.probability }</View>
            <View>颜值：{ faceInfo.beauty }</View>
            <View>表情：{ judgeExpression(faceInfo.expression.type) } ；可信度：{ faceInfo.expression.probability }</View>
            <View>脸型：{ judgeFaceShape(faceInfo.face_shape.type) } ；可信度：{ faceInfo.face_shape.probability }</View>
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
