
import React, { useRef, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { setPlayerState, setShowPlayer, setCurrentMusic, setCurrentIndex, setPlayList } from "../../store/actions"
import { playMode } from "../../utils"
import Header from "../../components/header"

import "./index.scss"

function Player (props) {
	const audioRef = useRef()
	const [ready, setReady] = useState(false)
	const [isPlay, setIsPlay] = useState(false)
	const { showPlayer, currentMusic, setPlayerStateDispatch, setShowPlayerDispatch } = props
	const { name, id, ar = [], al = {}, alia = [] } = currentMusic

	const songReady = () => {
		setReady(true)
	}

	const onBack = () => {
		setShowPlayerDispatch(false)
	}

	const onToggle = () => {
		setIsPlay(!isPlay)
		if (isPlay) {
			setPlayerStateDispatch(false)
			audioRef.current.pause()
		} else {
			setPlayerStateDispatch(true)
			audioRef.current.play()
		}
	}

	useEffect(() => {
		// 获取到歌曲id且canplay为true，即可播放
		if (id && ready) {
			setIsPlay(true)
			audioRef.current.play()
		}
	}, [id, ready])

	const fullPlayer = (
		<div className="player-normal">
			<Header>
				<i></i>
				<p className="player-title" key="main">
					<span className="name more">
						{name} {alia[0] ? `(${alia[0]})` : ""}
					</span>
					<span className="singer">{ar[0] ? `${ar[0].name}` : ""}</span>
				</p>
				<i key="right"></i>
			</Header>

			<div className={isPlay ? "player-main" : "player-main pause"}>
				<div className="needle" />
				<div className="player-cd">
					<div className="song-img">
						<img src={al.picUrl} alt="" />
					</div>
				</div>
			</div>

			<div className="player-footer">
				<div className="player-btn">
					<NavLink to={`/comment/${id}`} className="btn-wrapper" onClick={onBack} >
						<i className="iconfont icon-comments"></i>
					</NavLink>
					<span className="btn-wrapper">
						<i className="iconfont icon-more"></i>
					</span>
				</div>
				<div className="player-progress"></div>
				<div className="player-operate">
					<span className="btn-wrapper">
						<i className="iconfont icon-random"></i>
					</span>
					<span className="btn-wrapper">
						<i className="iconfont icon-back"></i>
					</span>
					<span className="btn-wrapper" onClick={onToggle}>
						{isPlay ? <i className="iconfont icon-pause"></i> : <i className="iconfont icon-play-circle"></i>}
					</span>
					<span className="btn-wrapper">
						<i className="iconfont icon-next"></i>
					</span>
					<span className="btn-wrapper">
						<i className="iconfont icon-menu"></i>
					</span>
				</div>
			</div>

			<div className="bg-img">
				<img src={al.picUrl} alt="" />
			</div>

			<div className="bg-gray"></div>
		</div>
	)

	return <div className="m-player">
		{showPlayer ? fullPlayer : <></>}
		<audio ref={audioRef} onCanPlay={songReady} src={`http://music.163.com/song/media/outer/url?id=${id}.mp3`} />
	</div>
}

//映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
	showPlayer: state.showPlayer,
	currentMusic: state.currentMusic,
	currentIndex: state.currentIndex,
	playList: state.playList,
})

//映射dispatch到props上
const mapDispatchToProps = dispatch => ({
	setPlayerStateDispatch: status => {
		dispatch(setPlayerState(status))
	},
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
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))
