import { combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'

// 初始数据
const initialState = {
  showPlayer: false, //Player显示状态
  playerState: false, //Player播放状态
  playList: [], //播放列表
  currentIndex: -1, //当前音乐索引
  currentMusic: {}, //当前音乐
  singer: {}, //当前歌手
  userInfo: {}
}

// 是否显示Player组件
function showPlayer (showPlayer = initialState.showPlayer, action) {
  switch (action.type) {
    case ActionTypes.SET_SHOW_PLAYER:
      return action.showPlayer
    default:
      return showPlayer
  }
}

// player播放状态
function playerState (playerState = initialState.playerState, action) {
  switch (action.type) {
    case ActionTypes.SET_PLAYER_STATE:
      return action.playerState
    default:
      return playerState
  }
}

// 设置当前音乐
function currentMusic (currentMusic = initialState.currentMusic, action) {
  switch (action.type) {
    case ActionTypes.SET_CURRENTMUSIC:
      return action.currentMusic
    default:
      return currentMusic
  }
}

// 设置当前音乐索引
function currentIndex (currentIndex = initialState.currentIndex, action) {
  switch (action.type) {
    case ActionTypes.SET_CURRENTINDEX:
      return action.currentIndex
    default:
      return currentIndex
  }
}

// 设置当前播放列表
function playList (playList = initialState.playList, action) {
  switch (action.type) {
    case ActionTypes.SET_PLAYLIST:
      return action.playList
    default:
      return playList
  }
}

function currentSinger (singer = initialState.singer, action) {
  switch (action.type) {
    case ActionTypes.SET_SINGER:
      return action.singer
    default:
      return singer
  }
}

function userInfo (info = initialState.userInfo, action) {
  switch (action.type) {
    case ActionTypes.SET_USERINFO:
      return action.info
    default:
      return info
  }
}

const reducer = combineReducers({
  showPlayer,
  playerState,
  currentMusic,
  currentIndex,
  currentSinger,
  playList,
  userInfo
})

export default reducer
