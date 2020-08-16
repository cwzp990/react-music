import React from "react"
import { more } from '../../utils'

import "./index.scss"

function List (props) {
	const { list, subscribed, history } = props
	console.log('歌曲列表', list)

	const onPlay = (id) => {
		// 播放器播放
	}

	return (
		<div className="m-list">
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
					<li className="item-song" key={song.id} onClick={() => onPlay(song.id)}>
						<div className="item-left">
							<p className="index">{index + 1}</p>
							<p className="song-name">
								<span className="name">{more(song.name, 25)}</span>
								<span className="singer">
									{song.ar[0].name} - {more(song.al.name, 25)}
								</span>
							</p>
						</div>
						<span className="play">
							<i className="iconfont icon-play"></i>
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default React.memo(List)
