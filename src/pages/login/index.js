import React from "react"

import "./index.scss"

function Login(props) {
  const {history} = props

  const goToDiscover = () => {
    history.push('/discover')
  }

	return (
		<div className="m-login">
			<div className="login-logo">
				<span className="logo-wrapper">
					<i className="iconfont icon-orange"></i>
				</span>
        <span className="dot"></span>
        <span className="pulse"></span>
        <span className="pulse1"></span>
			</div>

			<div className="login-btn">
				<p className="btn">手机账号登陆</p>
				<p className="btn" onClick={goToDiscover}>立即体验</p>
			</div>
		</div>
	)
}

export default React.memo(Login)
