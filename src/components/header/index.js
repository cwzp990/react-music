import React from "react"
import "./index.scss"
import { connect } from "react-redux"

function Header(props) {
	const { children } = props
	const { currentMusic } = props

	const { al = {} } = currentMusic
	const hasRight = children.filter(i => i.key === "right")

	return (
		<div className="m-header">
			{children.map((m, i) => (
				<div className={`header-${m.key}`} key={m.key}>
					{m}
				</div>
			))}
			{!hasRight.length && (
				<div className="header-right">
					<p className="cd-wrapper">
						<img src={al.picUrl} alt="" />
					</p>
				</div>
			)}
		</div>
	)
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
	currentMusic: state.currentMusic,
})

export default connect(mapStateToProps, null)(React.memo(Header))
