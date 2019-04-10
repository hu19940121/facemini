import Taro, { Component } from '@tarojs/taro'
import { View,Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import qiniuUploader from '../../utils/qiniuUploader'
import './index.scss'

@inject('counterStore','commonStore','imageStore')
@observer
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      imgUrl: null,
      banner: 'http://resource.kaier001.com/banenr.jpg',
      yanzhi: 'http://resource.kaier001.com/yanzhi.png',
      aixin:'http://resource.kaier001.com/aixin.png',
      mingxing: 'http://resource.kaier001.com/mingxing.png',
      sorryImg: 'http://resource.kaier001.com/sorry.jpg'
    }
  }
  config = {
    navigationBarTitleText: '首页',
  }
  componentDidMount () { 
    this.getQiniuToken()
  }
  //未开放
  noOpen = () =>{
    // 注意：无论用户点击确定还是取消，Promise 都会 resolve。
    Taro.showModal({
      title: '提示',
      content: '暂未开放此功能~',
    })
    .then(res => console.log(res.confirm, res.cancel))
  }
  upLoadImg = () => {
    // let that = this
    const { commonStore: { imgBucketUrl,imgToken }, imageStore } = this.props
    Taro.chooseImage().then(res=>{
      qiniuUploader.upload(res.tempFilePaths[0], (respic) => {
        imageStore.setImage(respic.imageURL)
        Taro.navigateTo({
          url: '/pages/handsome/handsome?id=2&type=test'
        })
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
  render () {
    const { imgUrl ,banner,yanzhi,aixin, mingxing, sorryImg } = this.state
    return (
      <View className='index'>
        <Image className='banner' src={banner}></Image>
        <Image style={imgUrl? '': 'display:none'} src={imgUrl}></Image>
        <View className='opera-cates'>
          <View onClick={this.upLoadImg} className='cate-item'>
            <Image src={yanzhi} className='icon'></Image>
            <Text className='text'>测颜值</Text>
          </View>
          <View onClick={this.noOpen} className='cate-item'>
            <Image src={aixin} className='icon'></Image>
            <Text className='text'>夫妻相测试</Text>
          </View>
          <View onClick={this.noOpen} className='cate-item'>
            <Image src={mingxing} className='icon'></Image>
            <Text className='text'>明星相</Text>
          </View>
        </View>
        <View className='sorry'>
          <Image mode='aspectFit' className='sorry-image' src={sorryImg}></Image>
          <Text>更多功能近期开放，敬请期待~</Text>
        </View>
      </View>
    )
  }
}

export default Index 
