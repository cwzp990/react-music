import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import Header from "../../components/header"
import { api } from "../../api"

import "./index.scss"

function Mine (props) {
	const { history } = props
	const { userInfo } = props
	const { avatarUrl, nickname, backgroundUrl, userId = 88905019 } = userInfo

	const [fm, setFm] = useState([])
	const [like, setLike] = useState({})
	const [playList, setPlayList] = useState([])

	useEffect(() => {
		api.getPersonalFmResource(userId).then(resp => {
			setFm(resp.data)
		})
		
		onSelect(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onDetails = id => {
		history.push(`/list_detail/${id}`)
	}

	const onSelect = (type) => {
		api.getUserPlaylistResource(userId).then(resp => {
			let like = resp.data.playlist[0]
			let create = resp.data.playlist.filter(i => i.userId === userId).map(i => ({
				id: i.id,
				name: i.name,
				coverImgUrl: i.coverImgUrl,
				trackCount: i.trackCount,
			}))
			let collect = resp.data.playlist.filter(i => i.userId !== userId).map(i => ({
				id: i.id,
				name: i.name,
				coverImgUrl: i.coverImgUrl,
				trackCount: i.trackCount,
			}))
			setLike(like)
			if (type === 1) {
				setPlayList(create)
			} else {
				setPlayList(collect)
			}
		})
	}

	return (
		<div className="m-mine">
			<div className="mine-info">
				<Header>
					<p key="main"></p>
					<i key="right"></i>
				</Header>
				<div className="users">
					<p className="avatar-wrapper">
						<img src={avatarUrl} alt="" />
					</p>
					<p className="name">{nickname}</p>
				</div>

				<div className="info-img"></div>
			</div>
			<div className="mine-main">
				<p className="title">我的音乐</p>
				<div className="like">
					<div className="wrapper">
						<p className="brief">我喜欢的音乐</p>
						<img src={like.coverImgUrl} alt="" />
					</div>
					<div className="wrapper">
						<p></p>
						<p className="name">
							<i></i>
							<span>私人fm</span>
						</p>
						<p className="brief">最懂你的推荐</p>
					</div>
				</div>
				<p className="title">最近播放</p>
				<ul>
					<li></li>
				</ul>
				<p className="tabs">
					<span className="tabs-item" onClick={() => onSelect(1)}>创建歌单</span>
					<span className="tabs-item" onClick={() => onSelect(2)}>收藏歌单</span>
				</p>
				<ul className="playlist-wrapper">
					{playList.map(i => (
						<li key={i.id} className="list-item" onClick={() => onDetails(i.id)}>
							<p className="cover">
								<img src={i.coverImgUrl} alt="" />
							</p>
							<div className="info">
								<p className="name">{i.name}</p>
								<p className="count">{i.trackCount} 首</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

//映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
	userInfo: state.userInfo,
})

export default connect(mapStateToProps, null)(React.memo(Mine))
