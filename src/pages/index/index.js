import Taro, { Component } from '@tarojs/taro'
import { View,Image, Text,Swiper, SwiperItem } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
// import { observer, inject } from '@tarojs/mobx'
import { connect } from '@tarojs/redux'
import qiniuUploader from '../../utils/qiniuUploader'
import './index.scss'
import Collect from '../components/collect'
import http  from '../../service/http'
import { onGetQiniuToken } from '../../actions/common'
import { onSetImage } from '../../actions/image'
// @inject('counterStore','commonStore','imageStore')
// @observer
@connect(({ common,image }) => ({
  common,
  image
}), (dispatch) => ({
  onGetQiniuToken () {
    dispatch(onGetQiniuToken())
  },
  onSetImage (image) {
    dispatch(onSetImage(image))
  },
}))
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      yanzhi: 'http://resource.kaier001.com/yanzhi.png',
      aixin:'http://resource.kaier001.com/aixin.png',
      mingxing: 'http://resource.kaier001.com/mingxing.png',
      sorryImg: 'http://resource.kaier001.com/sorry.jpg',
      bannerList:[]
    }
  }
  config = {
    navigationBarTitleText: '首页',
    backgroundTextStyle:'dark',
    enablePullDownRefresh: true
  }
  onPullDownRefresh(){
    Taro.stopPullDownRefresh()//停止下拉动作过渡
    this.getBanner()
  }
  componentDidMount () { 
    this.props.onGetQiniuToken()
    // this.getQiniuToken()
    // eslint-disable-next-line no-undef
    wx.showShareMenu({
      withShareTicket: true
    })  
  }
  componentDidShow() {
    this.getBanner()
  }
  getBanner() {
    http.get('api/v1/getBanner',{},false).then(res=>{      
      this.setState({
        bannerList:res.data
      })
    })
  }
  formSubmit = e => {
    const formId = e.detail.formId
    this.upLoadImg(formId)
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
  upLoadImg = (formId) => {
    // let that = this
    const sessionkey = Taro.getStorageSync('sessionkey')
    if (!sessionkey) {
      Taro.showModal({
        title: '请登录',
        content: '为了您更好的服务，请先登录',
      })
      .then(res => {
        if (res.confirm) {
          Taro.navigateTo({
            url: '/pages/auth/auth'
          })
          // Taro.switchTab({
          //   url: '/pages/personal/personal'
          // })
        }
      })
      return false
    }
    // const { commonStore: { imgBucketUrl,imgToken }, imageStore } = this.props
    const { imgBucketUrl,imgToken } = this.props.common
    console.log('imgBucketUrl,imgToken',imgBucketUrl,imgToken);
    
    Taro.chooseImage().then(res=>{
      qiniuUploader.upload(res.tempFilePaths[0], (respic) => {
        console.log('respic.imageURL',respic.imageURL);
        
        this.props.onSetImage(respic.imageURL)
        Taro.navigateTo({
          url: '/pages/handsome/handsome?formId=' + formId
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
  // getQiniuToken() {
  //   const { commonStore } = this.props
  //   commonStore.getQiniuToken()
  // }
  render () {
    const { yanzhi,aixin, mingxing, sorryImg,bannerList } = this.state
    return (
      <View className='index'>
        <official-account></official-account>
        <View className='banner'>
          <Swiper
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay
          >
              {
                bannerList.map((banner,index)=>{
                  return(
                    <SwiperItem key={index}>
                      <Image src={banner.url} className='lbimg' ></Image>
                    </SwiperItem>
                  )
                })
              }
          </Swiper>
        </View>
        <View className='opera-cates'>
          <Collect onClick={this.upLoadImg}>
            <View  className='cate-item'>
              <Image src={yanzhi} className='icon'></Image>
              <Text className='text'>测颜值</Text>
            </View>
          </Collect>
          <Collect onClick={this.noOpen}>
            <View  className='cate-item'>
              <Image src={aixin} className='icon'></Image>
              <Text className='text'>夫妻相测试</Text>
            </View>
          </Collect>
          <Collect onClick={this.noOpen}>
            <View className='cate-item'>
              <Image src={mingxing} className='icon'></Image>
              <Text className='text'>明星相</Text>
            </View>
          </Collect>
        </View>
        <Collect>
          <View className='sorry'>
            <Image mode='aspectFit' className='sorry-image' src={sorryImg}></Image>
            <Text>更多功能近期开放，敬请期待~</Text>
          </View>
        </Collect>
      </View>
    )
  }
}

export default Index 
