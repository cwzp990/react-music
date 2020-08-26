import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { addPlay } from "../../store/actions"
import { api } from "../../api"

import "./index.scss"

function Friend(props) {
	const [list, setList] = useState([])
	const { addPlayDispatch } = props

	useEffect(() => {
		api.getHotwallList().then(resp => {
			setList(resp.data.data)
		})
	}, [])

	const onPlay = song => {
		// 播放器播放
		addPlayDispatch(song)
	}

	return (
		<div className="m-friend">
			{list.map(i => (
				<div className="m-hotwall" key={i.id} onClick={() => onPlay(i.song)}>
					<div className="img-wrapper">
						<img src={i.simpleResourceInfo.songCoverUrl} alt="" />
						<span className="song-info">
							{i.simpleResourceInfo.name} - {i.simpleResourceInfo.artists[0].name}
						</span>
					</div>
					<div className="hotwall-main">
						<p className="content">{i.content}</p>
						<div className="userinfo">
							<p className="info">
								<span className="avatar">
									<img src={i.simpleUserInfo.avatar} alt="" />
								</span>
								<span className="name more">{i.simpleUserInfo.nickname}</span>
							</p>
							<p className="liked">{i.likedCount} 赞</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

// 映射dispatch到props上
const mapDispatchToProps = dispatch => ({
	addPlayDispatch: song => {
		dispatch(addPlay(song))
	},
})

export default connect(null, mapDispatchToProps)(React.memo(Friend))
