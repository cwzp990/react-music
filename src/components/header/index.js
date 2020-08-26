import React from "react"
import "./index.scss"
import { connect } from "react-redux"

function Header(props) {
	const { children, history } = props
	const { currentMusic } = props
	const { al = {} } = currentMusic
	const [left, main, right] = children

	const onBack = () => {
		history.goBack()
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
				<p className="cd-wrapper">
					<img src={al.picUrl} alt="" />
				</p>
			)}
		</div>
	)
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
	currentMusic: state.currentMusic,
})

export default connect(mapStateToProps, null)(React.memo(Header))
