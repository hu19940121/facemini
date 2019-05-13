import Taro, { Component } from '@tarojs/taro'
import { View,Form,Button } from '@tarojs/components'
// import qiniuUploader from '../../utils/qiniuUploader'
import http  from '../../../service/http'
import './index.scss'

class Collect extends Component {
  componentDidMount () {
  }
  formSubmit=(e)=> {
    // console.log('e',e);
    const formId = e.detail.formId
    http.get('api/v1/collectFormId',{formId},false).then(res=>{
      console.log(res);
    })
  }
  render () {
    return (
      <View className='collect'>
        <Form reportSubmit onSubmit={this.formSubmit} className='form'>
          <Button className='box' formType='submit' onClick={this.props.onClick}>
            {this.props.children}
          </Button>
        </Form>
      </View>
    )
  }
}

export default Collect 
