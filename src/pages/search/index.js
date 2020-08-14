import React from "react"
import { api } from '../../api'

import './index.scss'

function Discover (props) {
	const { history } = props

	let onBack = () => {
		history.goBack()
	}

	return <div className="m-search">
		<div className="m-header">
			<div className="header-main">
				<input className="search-box" placeholder="随便搜搜吧┑(￣Д ￣)┍" />
				<i className="iconfont icon-search"></i>
				<span className="cancel" onClick={onBack}>取消</span>
			</div>
			<div className="header-right">
				<i className="iconfont icon-person"></i>
			</div>
		</div>
	</div>
}

export default React.memo(Discover)
