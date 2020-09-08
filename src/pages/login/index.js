import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Cookies from "js-cookie"
import { setUserInfo } from "../../store/actions"

import "./index.scss"
import { api } from "../../api"

function Login (props) {
	const { history } = props
	const { setUserInfoDispatch } = props
	const [isShow, setIsShow] = useState(false)
	const [isSend, setIsSend] = useState(false)
	const [phone, setPhone] = useState("")
	const [password, setPassword] = useState("")
	const [count, setCount] = useState(60)

	const goToDiscover = () => {
		history.push("/discover")
	}

	const showFormBox = (e) => {
		e.stopPropagation()
		setIsShow(true)
	}

	const closeFormBox = () => {
		setIsShow(false)
	}

	const onPhone = e => {
		let val = e.target.value.replace(/[^\d]+/, "")
		setPhone(val)
	}

	const onPassword = e => {
		let val = e.target.value
		setPassword(val)
	}

	const getAuth = () => {
		if (isSend || !phone) return
		api.getAuthCode(phone).then(resp => {
			if (resp.data.code === 200) {
				setIsSend(true)
				const countDown = setInterval(() => {
					setCount(preSecond => {
						if (preSecond <= 1) {
							setIsSend(false)
							clearInterval(countDown)
							// 重置秒数
							return 60
						}
						return preSecond - 1
					})
				}, 1000)
			}

		})
	}

	const cancelBubble = (e) => {
		e.stopPropagation()
	}

	const noUser = () => {
		setPhone(18655323262)
		setPassword("cwzp990.!")
		onSubmit()
	}

	// 绑定事件
	useEffect(() => {
		window.addEventListener("click", closeFormBox)

		return (() => {
			window.removeEventListener('click', closeFormBox)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onSubmit = () => {
		if (!phone || !password) return
		api.getLoginCellphoneResource(phone, password).then(resp => {
			if (resp.data.code === 200) {
				const key = ["avatarUrl", "backgroundUrl", "birthday", "province", "city", "followed", "followeds", "follows", "gender", "nickname", "playlistBeSubscribedCount", "playlistCount", "signature", "userId", "userType", "vipType"]
				let info = {}
				key.forEach(k => (info[k] = resp.data.profile[k]))
				setUserInfoDispatch(info)
				Cookies.set("MUSIC_U", resp.data.token)
				goToDiscover()
			}
		})
	}

	return (
		<div className="m-login">
			<div className="login-logo">
				{/* <span className="dot"></span> */}
				<span className="pulse"></span>
				<span className="pulse1"></span>
			</div>

			<div className="login-btn">
				<p className="btn" onClick={showFormBox}>
					手机账号登陆
				</p>
				<p className="btn" onClick={goToDiscover}>
					立即体验
				</p>
			</div>

			<div className={isShow ? "login-form active" : "login-form"} onClick={cancelBubble}>
				<div className="username">
					<input value={phone} className="input" placeholder="请输入手机号" onChange={onPhone} />
					<span className={isSend ? "auth forbid" : "auth"} onClick={getAuth}>
						{isSend ? `${count} s` : "获取验证码"}
					</span>
				</div>
				<div className="password">
					<input type="password" value={password} className="input" placeholder="这里是密码不是验证码！" onChange={onPassword} />
				</div>
				<div className="submit" onClick={onSubmit}>
					登录
				</div>

				<div className="tips">提示：内部某些功能需要登录后方能使用（<em className="theme">如在不登录状态下歌单只会显示前十首歌曲</em>），密码仅用作于和网易云官方验证，不会记录在服务器中，请放心登录～</div>

				<span className="no-user" onClick={noUser}>桔子 <i className="iconfont icon-right"></i></span>
			</div>
		</div>
	)
}

//映射dispatch到props上
const mapDispatchToProps = dispatch => ({
	setUserInfoDispatch: status => {
		dispatch(setUserInfo(status))
	},
})

export default connect(null, mapDispatchToProps)(React.memo(Login))
