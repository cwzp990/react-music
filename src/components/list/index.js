import React from "react"
import { connect } from 'react-redux'
import { more } from '../../utils'

import "./index.scss"
import { setAllPlay } from "../../store/actions"

function List (props) {
	const { list, subscribed, history } = props
	const { setAllPlayDispatch } = props

	const onPlay = (index) => {
		// 播放器播放
		setAllPlayDispatch({
			playList: list,
			currentIndex: index
		})
	}

	return (
		<div className="m-list container">
			<div className="title">
				<p>
					<i className="iconfont icon-play"></i>
					<span className="all">播放全部</span>
					<span className="count"> (共 {list.length} 首)</span>
				</p>
				{subscribed && <p className="collect">+ 收藏 ({subscribed})</p>}
			</div>
			<ul className="list-wrapper">
				{list.map((song, index) => (
					<li className="item-song" key={song.id} onClick={() => onPlay(index)}>
						<div className="item-left">
							<p className="index">{index + 1}</p>
							<p className="song-name">
								<span className="name">{more(song.name, 20)}</span>
								<span className="singer">
									{song.ar[0].name} - {more(song.al.name, 25)}
								</span>
							</p>
						</div>
						<span className="play">
							<i className="iconfont icon-play-circle"></i>
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}

// 映射dispatch到props上
const mapDispatchToProps = dispatch => ({
	setAllPlayDispatch: list => {
		dispatch(setAllPlay(list))
	}
})

export default connect(null, mapDispatchToProps)(React.memo(List))
