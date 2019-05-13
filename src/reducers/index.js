// src/reducers/index.js
import { combineReducers } from 'redux'
import counter from './counter'
import common from './common'
import image from './image'
import user from './user'

export default combineReducers({
  counter,
  common,
  image,
  user
})
