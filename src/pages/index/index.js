import Taro, { Component } from '@tarojs/taro'
import { View,Image, Text,Swiper, SwiperItem } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import qiniuUploader from '../../utils/qiniuUploader'
import './index.scss'
import Collect from '../collect'
import http  from '../../service/http'

@inject('counterStore','commonStore','imageStore')
@observer
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
  }
  componentDidMount () { 
    this.getQiniuToken()
    this.getBanner()
  }
  getBanner() {
    http.get('api/v1/getBanner').then(res=>{      
      this.setState({
        bannerList:res.data
      })
    })
  }
  formSubmit = e => {
    console.log('e.detail.formId',e.detail.formId)
    const formId = e.detail.formId
    this.upLoadImg(formId)
    // http.get('api/v1/templateMessageSend',{formId}).then(res=>{
    //   console.log(res);
    // })
  }
  //未开放
  noOpen = () =>{
    console.log('noopen');
    
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
          Taro.switchTab({
            url: '/pages/personal/personal'
          })
        }
        console.log(res.confirm, res.cancel)
      })
      return false
    }
    const { commonStore: { imgBucketUrl,imgToken }, imageStore } = this.props
    Taro.chooseImage().then(res=>{
      qiniuUploader.upload(res.tempFilePaths[0], (respic) => {
        imageStore.setImage(respic.imageURL)
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
  getQiniuToken() {
    const { commonStore } = this.props
    commonStore.getQiniuToken()
  }
  render () {
    const { yanzhi,aixin, mingxing, sorryImg,bannerList } = this.state
    return (
      <View className='index'>
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
                    <SwiperItem>
                      <Image src={banner.url} className='lbimg' key={index}></Image>
                    </SwiperItem>
                  )
                })
              }
          </Swiper>
        </View>
        {/* <Image style={imgUrl? '': 'display:none'} src={imgUrl}></Image> */}
        <View className='opera-cates'>
          <Collect onClick={this.upLoadImg}>
            <View  className='cate-item'>
              <Image src={yanzhi} className='icon'></Image>
              <Text className='text'>测颜值</Text>
                {/* <Form reportSubmit onSubmit={this.formSubmit} className='form'>
                  <AtButton className='testFace-btn' formType='submit' type='primary' size='small'>测颜值</AtButton>
              </Form> */}
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
        {/* <Form reportSubmit onSubmit={this.formSubmit} >
          <AtButton formType='submit' type='primary' size='small'>按钮文案</AtButton>
      </Form> */}
      </View>
    )
  }
}

export default Index 
