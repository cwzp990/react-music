import React from "react"
import './index.scss'

function Header (props) {
	return (
		<div className="m-header">
			{props.children.map((m, i) => (<div className={`header-${m.key}`} key={m.key}>{m}</div>))}
		</div>
	)
}

export default React.memo(Header)
