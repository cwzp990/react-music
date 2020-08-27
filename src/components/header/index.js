import React from "react"
import { connect } from "react-redux"
import { setShowPlayer } from "../../store/actions"

import "./index.scss"

function Header(props) {
	const { children, history } = props
	const { currentMusic, playerState, setShowPlayerDispatch } = props
	const { al = {} } = currentMusic
	const [left, main, right] = children

	const onBack = () => {
		if (history) {
			history.goBack()
		} else {
			// 最小化播放器
			setShowPlayerDispatch(false)
		}
	}

	const onPlayer = () => {
		setShowPlayerDispatch(true)
	}

	// 如果传了对应的元素就渲染，否则渲染默认的元素
	return (
		<div className="m-header">
			{left.key ? (
				<div className="header-left">{left}</div>
			) : (
				<div className="header-left">
					<i className="iconfont icon-left" onClick={onBack}></i>
				</div>
			)}
			{main.key && <div className="header-main">{main}</div>}
			{right.key ? (
				<div className="header-right">{right}</div>
			) : (
				<p className={playerState ? 'cd-wrapper' : 'cd-wrapper pause'} onClick={onPlayer}>
					<img src={al.picUrl} alt="" />
				</p>
			)}
		</div>
	)
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
	currentMusic: state.currentMusic,
	playerState: state.playerState
})

const mapDispatchToProps = dispatch => ({
	setShowPlayerDispatch: status => {
		dispatch(setShowPlayer(status))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header))
