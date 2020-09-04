
import React, { useRef, useEffect, useState, useCallback } from "react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { setPlayerState, setShowPlayer, setShowPlayerList, setCurrentMusic, setCurrentIndex, setPlayList } from "../../store/actions"
import { playMode, formatPlayTime, getSinger, lyricParser } from "../../utils"
import Header from "../../components/header"
import ProgressBar from "../../components/progress"
import Scroll from "../../components/scroll"
import Playerlist from './list'
import { api } from '../../api'

import "./index.scss"

function Player (props) {
	const audioRef = useRef()
	const lyricRef = useRef()
	const lyricLineRefs = useRef([])
	const [ready, setReady] = useState(false)
	const [isPlay, setIsPlay] = useState(false)
	const [showLyric, setShowLyric] = useState(false)
	const [lyric, setLyric] = useState([])
	const [currentTime, setCurrentTime] = useState(0)
	const [currentLine, setCurrentLine] = useState(0)
	const [mode, setMode] = useState(1)
	const { showPlayer, currentIndex, currentMusic, playList, setPlayerStateDispatch, setShowPlayerDispatch, setShowPlayerListDispatch, setCurrentIndexDispatch, setCurrentMusicDispatch } = props

	const { name, id, dt, ar = [], al = {}, alia = [] } = currentMusic
	const duration = dt / 1000

	let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration

	const songReady = () => {
		setReady(true)
	}

	const songEnd = () => {
		if (mode === playMode.loop) {
			onLoop()
		} else {
			onNext()
		}
	}

	const onLoop = () => {
		setCurrentTime(0)
		setIsPlay(true)
		audioRef.current.play()
		if (lyric.length > 0) {
			setCurrentLine(0)
		}
	}

	const noCopyright = () => {
	}

	const songError = () => {
		// 无版权或是vip歌曲查找url
		getSongUrl()
	}

	const onBack = () => {
		setShowPlayerDispatch(false)
	}

	const onPrev = () => {
		let index = currentIndex - 1
		if (index < 0) {
			setCurrentIndexDispatch(playList.length - 1)
		}
		setCurrentIndexDispatch(index)
		setCurrentMusicDispatch(playList[index])
	}

	const onNext = () => {
		let index = currentIndex + 1
		if (index === playList.length) {
			index = 0
		}
		setCurrentIndexDispatch(index)
		setCurrentMusicDispatch(playList[index])
	}

	const updateTime = e => {
		setCurrentTime(e.target.currentTime);
	};

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

	const onProgressChange = curPercent => {
		const newTime = curPercent * duration;
		setCurrentTime(newTime);
		audioRef.current.currentTime = newTime;
		if (!isPlay) {
			setPlayerStateDispatch(true);
		}
	};

	const changeMode = () => {
		let newMode = (mode + 1) % 3;
		setMode(newMode)
		if (newMode === playMode.loop) return
	};

	const toggleLyric = () => {
		setShowLyric(!showLyric)
	}

	const showList = (e) => {
		e.stopPropagation()
		setShowPlayerListDispatch(true)
	}

	const closeList = useCallback(() => {
		setShowPlayerListDispatch(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getLyric = (id) => {
		api.getLyricResource(id).then(resp => {
			if (resp.data.nolyric) {
				setLyric([])
				return
			}
			let lyric = resp.data.lrc.lyric

			let lyrics = lyricParser(lyric)
			setLyric(lyrics)
		})
	}

	const getSongUrl = () => {
		if (!id) return
		api.getSongUrl(id).then(resp => {
			if (resp.status === 200) {
				if (resp.data.code === 200) {
					audioRef.current.src = resp.data.url
					audioRef.current.load()
				}
			}
		})
	}

	useEffect(() => {
		// 获取到歌曲id且canplay为true，即可播放
		if (id && ready) {
			setIsPlay(true)
			setCurrentTime(0)
			getLyric(id)
			audioRef.current.play()
		}
	}, [id, ready])

	// 设置当前播放行数
	useEffect(() => {
		if (!lyric.length || !isPlay || !showLyric) return
		let lyricIndex = 0
		for (let i = 0; i < lyric.length; i++) {
			if (currentTime > lyric[i].time) {
				lyricIndex = i
			}
		}
		setCurrentLine(lyricIndex)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTime])

	// 歌词滚动
	useEffect(() => {
		if (!lyricRef.current) return;
		let bScroll = lyricRef.current.getBScroll();
		if (currentLine > 5) {
			let lineEl = lyricLineRefs.current[currentLine - 5].current;
			bScroll.scrollToElement(lineEl, 1000);
		} else {
			bScroll.scrollTo(0, 0, 1000);
		}
	}, [currentLine]);

	// 绑定事件
	useEffect(() => {
		window.addEventListener("click", closeList)

		return (() => {
			window.removeEventListener('click', closeList)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const m_cd = (<div className={isPlay ? "player-main" : "player-main pause"} onClick={toggleLyric}>
		<div className="needle" />
		<div className="player-cd">
			<div className="song-img">
				<img src={al.picUrl} alt="" />
			</div>
		</div>
	</div>)

	const m_lyric = (
		<div className="m-lyric" onClick={toggleLyric}>
			<Scroll ref={lyricRef}>
				<div className="lyric-wrapper">
					{
						lyric.map((item, index) => {
							lyricLineRefs.current[index] = React.createRef();
							return (
								<p
									className={`line ${
										currentLine === index ? "current" : ""
										}`}
									key={item + index}
									ref={lyricLineRefs.current[index]}
								>
									{item.txt}
								</p>
							);
						})
					}
				</div>
			</Scroll>
		</div>)

	const fullPlayer = (
		<div className="player-normal">
			<Header>
				<i></i>
				<p className="player-title" key="main">
					<span className="name more">
						{name} {alia[0] ? `(${alia[0]})` : ""}
					</span>
					<span className="singer">{getSinger(ar)}</span>
				</p>
				<i key="right"></i>
			</Header>

			{showLyric ? m_lyric : m_cd}

			<div className="player-footer">
				<div className="player-btn">
					<NavLink to={`/comment/${id}`} className="btn-wrapper" onClick={onBack} >
						<i className="iconfont icon-comments"></i>
					</NavLink>
					<span className="btn-wrapper">
						<i className="iconfont icon-more"></i>
					</span>
				</div>
				<div className="player-progress">
					<p className="time time-l">{formatPlayTime(currentTime)}</p>
					<div className="progress-wrapper">
						<ProgressBar
							percent={percent}
							percentChange={onProgressChange}
						></ProgressBar>
					</div>
					<p className="time time-r">{formatPlayTime(duration)}</p>
				</div>
				<div className="player-operate">
					<span className="btn-wrapper" onClick={changeMode}>
						{mode === 0 ? <i className="iconfont icon-order"></i> : mode === 1 ? <i className="iconfont icon-loop"></i> : <i className="iconfont icon-random"></i>}
					</span>
					<span className="btn-wrapper" onClick={onPrev}>
						<i className="iconfont icon-back"></i>
					</span>
					<span className="btn-wrapper" onClick={onToggle}>
						{isPlay ? <i className="iconfont icon-pause"></i> : <i className="iconfont icon-play-circle"></i>}
					</span>
					<span className="btn-wrapper" onClick={onNext}>
						<i className="iconfont icon-next"></i>
					</span>
					<span className="btn-wrapper" onClick={showList} >
						<i className="iconfont icon-menu"></i>
					</span>
				</div>
			</div>

			<Playerlist currentIndex={currentIndex} />

			<div className="bg-img">
				<img src={al.picUrl} alt="" />
			</div>

			<div className="bg-gray"></div>
		</div>
	)

	return <div className="m-player">
		{showPlayer ? fullPlayer : <></>}
		<audio ref={audioRef} onCanPlay={songReady} onTimeUpdate={updateTime} onEnded={songEnd} onStalled={noCopyright} onError={songError} src={`http://music.163.com/song/media/outer/url?id=${id}.mp3`} />
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
	setShowPlayerListDispatch: status => {
		dispatch(setShowPlayerList(status))
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
