import React, { useState, forwardRef, useImperativeHandle } from "react"
import { connect } from "react-redux"
import { getSinger } from "../../utils"
import { addPlay } from "../../store/actions"

import "./list.scss"

const PlayerList = forwardRef((props, ref) => {
	const { playList, addPlayDispatch } = props
	const [isShow, setIsShow] = useState(false)

	const history = JSON.parse(localStorage.getItem("history")) || []

	const onPlay = song => {
		addPlayDispatch(song)
	}

	const onList = (status) => {
		setIsShow(status)
	}

	useImperativeHandle(ref, () => ({
		toggleList: (status) => {
			onList(status)
		}
	}))

	return (
		<div className="m-playerlist" style={{ visibility: isShow ? 'visible' : 'hidden' }}>
			{/* <div className="history">
				<p className="title">
					<span>历史播放</span>
					<i className="iconfont icon-empty"></i>
				</p>
				<ul className="list-wrapper">
					{history.map(i => (
						<li className="item-list" key={i.id} onClick={() => onPlay(i)}>
							<span className="name">{i.name}</span>
							<span className="singer">{getSinger(i.ar)}</span>
						</li>
					))}
				</ul>
				<p className="close">关闭</p>
			</div> */}
			<div className="now">
				<p className="title">
					<span>当前播放</span>
					<i className="iconfont icon-empty"></i>
				</p>
				<ul className="list-wrapper">
					{playList.map(i => (
						<li className="item-list" key={i.id} onClick={() => onPlay(i)}>
							<span className="name">{i.name}</span>
							<span className="singer">{getSinger(i.ar)}</span>
						</li>
					))}
				</ul>
				<p className="close" onClick={() => onList(false)}>关闭</p>
			</div>
		</div>
	)
})

//映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
	playList: state.playList,
})

// 映射dispatch到props上
const mapDispatchToProps = dispatch => ({
	addPlayDispatch: song => {
		dispatch(addPlay(song))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayerList))
