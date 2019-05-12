import Taro, { Component } from '@tarojs/taro'
import { View,Button  } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import http  from '../../service/http'
import { random }  from '../../utils/util'
import './poster.scss'

// import Poster from 'wxa-plugin-canvas'

class Poster extends Component {
  constructor (props) {
    super(props)
    this.state= {
      isCreate: false, //是否已经生成
      canSave: true,
    }
  }
  componentDidMount () {
    Taro.showLoading({
      title:'生成中~'
    })
    this.getFaceInfo()
  }
  config = {
    navigationBarTitleText: '颜值海报',
    navigationBarBackgroundColor: '#8526fb',
    usingComponents:{
      'painter':'../../components/painter/painter'
    }
  }
  getFaceInfo() {
    http.get('api/v1/getFaceInfo').then(result=>{
      const faceInfo = result.data
      if (faceInfo) {
        let score_info = JSON.parse(faceInfo.score_info)
        let face = score_info.face_list[0]        
        console.log(score_info,face);
        const peopleNum = random(100,200)
        this.setState({
          posterData:{
            width: '654rpx',
            height: '1000rpx',
            background: 'https://resource.kaier001.com/muban.png',
            borderRadius: '10rpx',
            views: [
              {
                type: 'image',
                url: faceInfo.face_img,
                css: {
                  borderRadius: '150rpx',
                  width: '318rpx',
                  left:'177rpx',
                  height: '318rpx',
                  top: '190rpx',
                  mode: 'scaleToFill',
                },
              },
              {
                type: 'text',
                text: "",
                css: {
                  fontSize: '30rpx',
                  left:'10px',
                  top: '6rpx',
                  color:'#fff'
                },
              },
              {
                type: 'text',
                text: face.beauty + '',
                // left:'中间',
                css: {
                  align:'center',
                  fontSize: '60rpx',
                  left:'327rpx',
                  // left:'130px',
                  top: '680rpx',
                  color:'#fff',
                },
              },
              {
                type: 'text',
                text: peopleNum + '名',
                css: {
                  fontSize: '34rpx',
                  left:'80px',
                  // left:'130px',
                  bottom: '136rpx',
                  color:'red',
                },
              },
              {
                type: 'image',
                url: 'https://resource.kaier001.com/xcxm.jpg',
                css: {
                  width: '160rpx',
                  right:'10rpx',
                  height: '160rpx',
                  bottom: '20rpx',
                  mode: 'scaleToFill',
                },
              },
            ],
          }
        })
      } else {
        Taro.showToast({
          title:'未找到对应数据~',
          icon:'none'
        })
      }
    })
  }
  onImgOK= (e) =>{
    Taro.hideLoading()
    this.setState({
      isCreate: true,
      createdImgPath: e.detail.path
    })
  }
  saveFile = () => {
    const { createdImgPath  } = this.state
    Taro.saveImageToPhotosAlbum({
      filePath:createdImgPath
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log('err.errMsg_________',err);
      
      if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
        this.setState({
          canSave: false
        })
      }
    })
  }
  handleOpenSetting = (e) => {
    if (e.detail.errMsg=== 'openSetting:ok') {
      this.setState({
        canSave: true
      })
    } 
  }

  onShareAppMessage() {
    const {createdImgPath} = this
    return {
      title: '海报',
      path: 'pages/index/index',
      imageUrl: createdImgPath,
    }
  }
  render () {
    const { posterData,isCreate,canSave } = this.state    
    let btn
    if (canSave) {
      btn = (
        <Button className='btns' type='primary' onClick={this.saveFile}>保存到相册</Button>
      )
    } else {
      btn = (
        <Button className='btns' type='primary' open-type='openSetting' 
          onOpenSetting={this.handleOpenSetting}
        >授权到保存相册</Button>
      )  
    }
    return (
      <View className='poster'>
        <painter dirty  customStyle='margin-left:44rpx;margin-top:44rpx' palette={posterData} onImgOK={this.onImgOK} />
        <View className='btn-wrapper' style={isCreate? '': 'display:none'}>
          {btn}
          {/* <Collect> */}
            <Button openType='share' className='btns' type='secondary'>分享给好友</Button>
          {/* </Collect> */}
        </View>
      </View>
    )
  }
}

export default Poster 
