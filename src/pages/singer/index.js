import React, { useState, useEffect } from "react"
import Header from '../../components/header'
import { connect } from 'react-redux'
import { setSinger } from "../../store/actions"
import { api } from "../../api"

import "./index.scss"

function Singer (props) {
	const { history } = props
	const { setSingerDispatch } = props
	const [singerList, setSingerList] = useState([])
	const [area, setArea] = useState(-1)
	const [type, setType] = useState(-1)

	useEffect(() => {
		api.getTopArtistsResource().then(resp => {
			setSingerList(resp.data.artists)
		})
	}, [])

	useEffect(() => {
		api.getArtList(area, type).then(resp => {
			setSingerList(resp.data.artists)
		})
	}, [area, type])

	const changeArea = area => {
		setArea(area)
	}
	const changeType = type => {
		setType(type)
	}

	const onBack = () => {
		history.goBack()
	}

	// 路由拦截
	const goToInfo = singer => {
		setSingerDispatch(singer)
		history.push(`/singerinfo/${singer.id}`)
	}

	return (
		<div className="m-singer">
			<Header>
				<i className="iconfont icon-left" onClick={onBack} key="left"></i>
				<p className="header-title" key="main">歌手分类</p>
			</Header>
			<div className="m-category">
				<p>
					<span className={area === 7 ? "active" : ""} onClick={() => changeArea(7)}>
						华语
					</span>
					<span className={area === 96 ? "active" : ""} onClick={() => changeArea(96)}>
						欧美
					</span>
					<span className={area === 8 ? "active" : ""} onClick={() => changeArea(8)}>
						日本
					</span>
					<span className={area === 16 ? "active" : ""} onClick={() => changeArea(16)}>
						韩国
					</span>
					<span className={area === 0 ? "active" : ""} onClick={() => changeArea(0)}>
						其他
					</span>
				</p>
				<p>
					<span className={type === 1 ? "active" : ""} onClick={() => changeType(1)}>
						男
					</span>
					<span className={type === 2 ? "active" : ""} onClick={() => changeType(2)}>
						女
					</span>
					<span className={type === 3 ? "active" : ""} onClick={() => changeType(3)}>
						乐队/组合
					</span>
				</p>
			</div>

			<div className="singer-wrapper container">
				<ul className="list-wrapper">
					{singerList.map(i => (
						<li className="item-singer" key={i.id} onClick={() => goToInfo(i)}>
							<p className="singer">
								<span className="avatar">
									<img src={i.img1v1Url} alt="" />
								</span>
								<span className="name">{i.name} <em className="sub">{i.trans ? `(${i.trans})` : ""}</em></span>
							</p>
							<span className="follow">+ 关注</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

//映射dispatch到props上
const mapDispatchToProps = dispatch => ({
	setSingerDispatch: singer => {
		dispatch(setSinger(singer))
	},
})

export default connect(null, mapDispatchToProps)(React.memo(Singer))

