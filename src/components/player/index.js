/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import {
	setShowPlayer,
	setCurrentMusic,
	setCurrentIndex,
	setPlayList
} from '../../store/actions'

import { playMode } from '../../utils'
import Header from "../../components/header"

import "./index.scss"

function Player (props) {
	const audioRef = useRef();

	const { showPlayer, currentMusic, setShowPlayerDispatch } = props
	const { name, id, ar = [], al = {}, alia = [] } = currentMusic

	useEffect(() => {
		if (!playList.length)
	})

	const onBack = () => {
		// 最小化播放器
		setShowPlayerDispatch(false)
	}

	const fullPlayer = <div className="m-player">
		<Header>
			<i className="iconfont icon-left" onClick={onBack} key="left"></i>
			<p className="player-title" key="main">
				<span className="name more">
					{name} {alia[0] ? `(${alia[0]})` : ""}
				</span>
				<span className="singer">{ar[0] ? `${ar[0].name}` : ""}</span>
			</p>
		</Header>

		<div className="player-main">
			<div className="song-img">
				<img src={al.picUrl} alt="" />
			</div>
		</div>

		<div className="player-footer">
			<div className="player-btn">
				<NavLink to={`/comment/${id}`}>
					<i className="iconfont icon-comments" onClick={onBack} ></i>
				</NavLink>
				<i className="iconfont icon-more"></i>
			</div>
			<div className="player-progress"></div>
			<div className="player-operate">
				<i className="iconfont icon-random"></i>
				<i className="iconfont icon-back"></i>
				<i className="iconfont icon-play"></i>
				<i className="iconfont icon-next"></i>
				<i className="iconfont icon-menu"></i>
			</div>
		</div>

		<div className="bg-img">
			<img src={al.picUrl} alt="" />
		</div>

		<div className="bg-gray"></div>

		<audio ref={audioRef} src={`http://music.163.com/song/media/outer/url?id=${id}.mp3`} />
	</div>

	const miniPlayer = <audio />

	return showPlayer ? fullPlayer : miniPlayer
}

//映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
	showPlayer: state.showPlayer,
	currentMusic: state.currentMusic,
	currentIndex: state.currentIndex,
	playList: state.playList
})
//映射dispatch到props上
const mapDispatchToProps = dispatch => ({
	setShowPlayerDispatch: status => {
		dispatch(setShowPlayer(status))
	},
	setCurrentMusicDispatch: status => {
		dispatch(setCurrentMusic(status))
	},
	setCurrentIndexDispatch: status => {
		dispatch(setCurrentIndex(status))
	},
	setPlayListDispatch: status => {
		dispatch(setPlayList(status))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))