import React, { useState, useEffect } from "react"
import List from "../../components/list"
import { api } from "../../api"
import { convertCount } from "../../utils"

import "./index.scss"

function SongListDetail(props) {
	const {history, match} = props

	const url_id = match.params.id
	const [songlist, setSonglist] = useState({})
	const { creator = {}, tracks = [], name, coverImgUrl, description, id, userId, playCount, subscribedCount } = songlist

	const bg = {
		background: `url(${coverImgUrl}) no-repeat`,
	}

	useEffect(() => {
		api.getPlaylistDetailResource(url_id).then(resp => {
			setSonglist(resp.data.playlist)
		})
	}, [])

	const onInfo = (id) => {
		history.push(`/list_info/${id}`)
	}

	return (
		<div className="m-songlist-details">
			<div className="songlist-info" style={bg} onClick={() => onInfo(id)}>
				<div className="cover">
					<img src={coverImgUrl} alt="" />
					<span className="count">
						<i className="iconfont icon-play"></i>
						{convertCount(playCount)}
					</span>
				</div>
				<div className="info">
					<p className="title more">{name}</p>
					<p className="creator">
						<span className="avatar-wrapper">
							<img src={creator.avatarUrl} alt="" />
						</span>
						<span className="name">
							{creator.nickname}
							<i className="iconfont icon-right"></i>
						</span>
					</p>
					<p className="desc">{description}</p>
				</div>
			</div>
			<div className="songlist-main">
				<List list={tracks} subscribed={subscribedCount} />
			</div>
		</div>
	)
}

export default React.memo(SongListDetail)
