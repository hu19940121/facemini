import Taro, { Component } from '@tarojs/taro'
import { View, Button,Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import qiniuUploader from '../../utils/qiniuUploader'
import http  from '../../service/http'
import './index.scss'

@inject('counterStore','commonStore')
@observer
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      imgUrl: null,
      faceInfo: {},
      banner: 'http://resource.kaier001.com/banenr.jpg',
      yanzhi: 'http://resource.kaier001.com/yanzhi.png'
    }
  }
  config = {
    navigationBarTitleText: '首页',
  }
  componentDidMount () { 
    this.getQiniuToken()
  }
  upLoadImg = () => {
    let that = this
    const { commonStore: { imgBucketUrl,imgToken } } = this.props
    Taro.chooseImage().then(res=>{
      qiniuUploader.upload(res.tempFilePaths[0], (respic) => {
        this.setState({
          imgUrl: respic.imageURL
        })
        that.face(respic.imageURL)
      }, (error) => {
        console.log('error: ' + error);
      }, {
        region: 'SCN',
        domain: imgBucketUrl, //如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
        uptoken: imgToken, // 由其他程序生成七牛 uptoken
      });      
    })
  }
  //获取七牛token和url
  getQiniuToken() {
    const { commonStore } = this.props
    commonStore.getQiniuToken()
  }
  async face(image) {
    let res = await http.get('api/v1/faceAPI',{ image })
    console.log('res',res);
    if (res.data) {
      this.setState({
        faceInfo: res.data.face_list[0]
      })
    }
  }
  render () {
    const { imgUrl, faceInfo ,banner,yanzhi } = this.state
    // const { counterStore: { counter } } = this.props
    return (
      <View className='index'>
        <Image className='banner' src={banner}></Image>
        <Image style={imgUrl? '': 'display:none'} src={imgUrl}></Image>
        {/* <Button onClick={this.upLoadImg} className='btn-max-w' plain type='primary'>上传图片</Button> */}
        <View className='opera-cates'>
          <View onClick={this.upLoadImg} className='cate-item'>
            <Image src={yanzhi} className='icon'></Image>
            <Text className='text'>测颜值</Text>
          </View>
        </View>
        <View className={faceInfo.age ? '' : 'hidden'}>
          <View>年龄{ faceInfo.age }</View>
          <View>性别{ faceInfo.gender.type } 可信度 { faceInfo.gender.probability }</View>
          <View>颜值{ faceInfo.beauty }</View>
          <View>表情{ faceInfo.expression.type } 可信度 { faceInfo.expression.probability }</View>
          <View>脸型{ faceInfo.face_shape.type } 可信度 { faceInfo.face_shape.probability }</View>
        </View>
      </View>
    )
  }
}

export default Index 
