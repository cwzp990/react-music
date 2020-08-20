import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { api } from '../../api'
import Header from "../../components/header"
import Slider from "../../components/slider"
import { today } from '../../utils'

import './index.scss'

function Discover (props) {
	const { history } = props

	const [imgList, setImgList] = useState([])

	useEffect(() => {
		// getData
		api.getBanner().then(resp => {
			setImgList(resp.data.banners)
		})
	}, [])

	const onSearch = () => {
		history.push('/search')
	}

	const goToSinger = () => {
		history.push('/singer')
	}

	return <div className="m-discover container">
		<Header>
			<input className="search-box" placeholder="随便搜搜吧 ┑(￣Д ￣)┍" onFocus={onSearch} key="main" />
			<i className="iconfont icon-person" onClick={goToSinger} key="right"></i>
		</Header>
		<Slider imgList={imgList} />
		<div className="discover-btn">
			<NavLink to="/daily"><i className="iconfont icon-calendar"></i><span className="btn-title">每日推荐</span><span className="today">{today()}</span></NavLink>
			<NavLink to="/songlist"><i className="iconfont icon-songlist"></i><span className="btn-title">歌单</span></NavLink>
			<NavLink to="/rank"><i className="iconfont icon-rank"></i><span className="btn-title">排行榜</span></NavLink>
		</div>
	</div>
}

export default React.memo(Discover)
