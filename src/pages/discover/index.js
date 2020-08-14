import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { api } from '../../api'
import Slider from "../../components/slider"

import './index.scss'

function Discover (props) {

	const [imgList, setImgList] = useState([])

	useEffect(() => {
		// getData
		api.getBanner().then(resp => {
			setImgList(resp.data.banners)
		})
	}, [])

	return <div>
		<Slider imgList={imgList} />
		<div className="discover-btn">
			<NavLink to="/daily"><i className="iconfont"></i><span>每日推荐</span><span>13</span></NavLink>
			<NavLink to="/songlist"><i className="iconfont"></i><span>歌单</span></NavLink>
			<NavLink to="/rank"><i className="iconfont"></i><span>排行榜</span></NavLink>
		</div>
	</div>
}

export default React.memo(Discover)
