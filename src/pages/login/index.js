import React, { useState } from "react"

import "./index.scss"
import { api } from "../../api"

function Login (props) {
	const { history } = props
	const [isShow, setIsShow] = useState(false)
	const [isSend, setIsSend] = useState(false)
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [count, setCount] = useState(60)

	const goToDiscover = () => {
		history.push('/discover')
	}

	const openFormBox = () => {
		setIsShow(true)
	}

	const onPhone = e => {
		let val = e.target.value.replace(/[^\d]+/, '')
		setPhone(val)
	}

	const onPassword = e => {
		let val = e.target.value
		setPassword(val)
	}

	const getAuth = () => {
		if (isSend) return
		api.getAuthCode(phone).then(resp => {
			setIsSend(true)
			const countDown = setInterval(() => {
				setCount((preSecond) => {
					if (preSecond <= 1) {
						setIsSend(false)
						clearInterval(countDown)
						// 重置秒数
						return 60
					}
					return preSecond - 1
				})
			}, 1000)
		})
	}

	const onSubmit = () => {
		api.getLoginCellphoneResource(phone, password).then(resp => {
			console.log("验证密码", resp)
		})
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
				<p className="btn" onClick={openFormBox} >手机账号登陆</p>
				<p className="btn" onClick={goToDiscover}>立即体验</p>
			</div>

			<div className={isShow ? 'login-form active' : 'login-form'} >
				<div className="username">
					<input value={phone} className="input" placeholder="请输入手机号" onChange={onPhone} />
					<span className={isSend ? 'auth forbid' : 'auth'} onClick={getAuth}>
						{isSend ? `${count} s` : '获取验证码'}
					</span>
				</div>
				<div className="password">
					<input value={password} className="input" placeholder="请输入验证码" onChange={onPassword} />
				</div>
				<div className="submit" onClick={onSubmit}>登录</div>

				<div className="tips">提示：内部某些功能需要登录后方能使用，密码仅用作于和网易云官方验证，不会记录在服务器中，请放心登录～</div>
			</div>
		</div>
	)
}

export default React.memo(Login)
