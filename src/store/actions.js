import * as ActionTypes from './actionTypes'
import { findIndex } from '../utils'

// 显示Player组件
export function setShowPlayer (showPlayer) {
  return { type: ActionTypes.SET_SHOW_PLAYER, showPlayer }
}

// 显示播放列表组件
export function setShowPlayerList (showList) {
  return { type: ActionTypes.SET_SHOW_PLAYER_LIST, showList }
}

// 设置播放状态
export function setPlayerState (playerState) {
  return { type: ActionTypes.SET_PLAYER_STATE, playerState }
}

// 设置当前音乐
export function setCurrentMusic (currentMusic) {
  return { type: ActionTypes.SET_CURRENTMUSIC, currentMusic }
}

// 设置当前音乐索引
export function setCurrentIndex (currentIndex) {
  return { type: ActionTypes.SET_CURRENTINDEX, currentIndex }
}

// 设置当前播放列表
export function setPlayList (playList) {
  return { type: ActionTypes.SET_PLAYLIST, playList }
}

// 设置当前歌手
export function setSinger (singer) {
  return { type: ActionTypes.SET_SINGER, singer }
}

// 设置当前用户信息
export function setUserInfo (info) {
  return { type: ActionTypes.SET_USERINFO, info }
}

// 设置当前歌单类型
export function setCategory (category) {
  return { type: ActionTypes.SET_CATEGORY, category }
}

// 播放歌曲（替换歌单列表）
export const setAllPlay = ({ playList, currentIndex }) => dispatch => {
  dispatch(setShowPlayer(true))
  dispatch(setPlayerState(true))
  dispatch(setPlayList(playList))
  dispatch(setCurrentIndex(currentIndex))
  dispatch(setCurrentMusic(playList[currentIndex]))
}

// 播放歌曲（插入一条到播放列表）
export const addPlay = music => (dispatch, getState) => {
  let playList = [...getState().playList]
  //查询当前播放列表是否有待插入的音乐，并返回其索引
  let index = findIndex(playList, music)
  //当前播放列表有待插入的音乐时，直接改变当前播放音乐的索引
  if (index > -1) {
    dispatch(setCurrentIndex(index))
    dispatch(setCurrentMusic(playList[index]))
  } else {
    index = playList.push(music) - 1
    dispatch(setPlayList(playList))
    dispatch(setCurrentIndex(index))
    dispatch(setCurrentMusic(playList[index]))
  }
  dispatch(setPlayerState(true))
  dispatch(setShowPlayer(true))
}