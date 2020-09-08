import React from "react"
import { connect } from "react-redux"
import { setShowPlayer } from "../../store/actions"

import "./index.scss"

function Header (props) {
	const { history } = props
	const { header, currentMusic, playerState, setShowPlayerDispatch } = props
	const { al = {} } = currentMusic

	const onBack = (e) => {
		e.stopPropagation()
		if (history) {
			history.goBack()
		} else {
			// 最小化播放器
			setShowPlayerDispatch(false)
		}
	}

	const onPlayer = (e) => {
		e.stopPropagation()
		if (JSON.stringify(currentMusic) === '{}') return
		setShowPlayerDispatch(true)
	}

	// 如果传了对应的元素就渲染，否则渲染默认的元素
	return (
		<div className="m-header">
			<div className="header-left" onClick={onBack}>
				<i className="iconfont icon-left"></i>
			</div>
			<div className="header-main">{header}</div>
			<div className="header-right" onClick={onPlayer}>
				{al.picUrl ? (<p className={playerState ? 'cd-wrapper' : 'cd-wrapper pause'}>
					<img src={al.picUrl} alt="" />
				</p>) : <i className="iconfont icon-disc"></i>}
			</div>
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
