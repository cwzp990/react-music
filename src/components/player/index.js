import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import Header from "../../components/header"

import "./index.scss"
import { api } from "../../api"

function Player (props) {
	const [songInfo, setSongInfo] = useState({})
	const [isFull, setIsFull] = useState(false)
	const { name, ar = [], al = {}, alia = [] } = songInfo
	const url_id = 1403215687

	const onBack = () => {
		// 最小化播放器
	}

	const changeToMini = () => {
		setIsFull(false)
	}

	useEffect(() => {
		api.getSongDetails(url_id).then(resp => {
			setSongInfo(resp.data.songs[0])
		})
	}, [])

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
				<NavLink to={`/comment/${url_id}`}>
					<i className="iconfont icon-comments" onClick={changeToMini} ></i>
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

		<audio src={`http://music.163.com/song/media/outer/url?id=${url_id}.mp3`} />
	</div>

	const miniPlayer = <audio />

	return isFull ? fullPlayer : miniPlayer
}

export default React.memo(Player)
