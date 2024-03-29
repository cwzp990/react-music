import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Slider from "../../components/slider"
import Box from "../../components/songlist-box"

import { today } from "../../utils"
import { api } from "../../api"

import "./index.scss"

function Discover (props) {
	const { history } = props

	const [imgList, setImgList] = useState([])
	const [recommends, setRecommends] = useState([])

	useEffect(() => {
		// getData
		api.getBanner().then(resp => {
			if (resp.data.code === 200) {
				setImgList(resp.data.banners)
			}
		})

		api.getPersonalized().then(resp => {
			if (resp.data.code === 200) {
				setRecommends(resp.data.result)
			}
		})
	}, [])

	const onSearch = () => {
		history.push("/search")
	}

	const onMore = () => {
		history.push("/songlist")
	}

	return (
		<div className="m-discover">
			<Slider imgList={imgList} />
			<div className="discover-btn">
				<NavLink to="/daily">
					<i className="iconfont icon-calendar"></i>
					<span className="btn-title">每日推荐</span>
					<span className="today">{today()}</span>
				</NavLink>
				<NavLink to="/songlist">
					<i className="iconfont icon-songlist"></i>
					<span className="btn-title">歌单</span>
				</NavLink>
				<NavLink to="/rank">
					<i className="iconfont icon-rank"></i>
					<span className="btn-title">排行榜</span>
				</NavLink>
			</div>

			<div className="m-recommends container">
				<p className="title">推荐歌单</p>
				<p className="subTitle">
					<span className="tips">为你精挑细选</span>
					<span className="more" onClick={onMore} >查看更多</span>
				</p>

				<div className="recommends-wrapper">
					{recommends.map(list => (
						<div className="box-wrapper" key={list.id}>
							<Box info={list} history={history}></Box>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default React.memo(Discover)
