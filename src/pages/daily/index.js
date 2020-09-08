import React, { useState, useEffect } from "react"
import List from "../../components/list"
import { api } from "../../api"
import { today, getMonth } from "../../utils"

import "./index.scss"

function Daily (props) {
	const { history } = props
	const [dailyList, setDailyList] = useState([])
	const bgUrl = dailyList.length ? dailyList[0].al.picUrl : ""

	useEffect(() => {
		api.getRecommendSongsResource().then(resp => {
			if (resp.data.code === 200) {
				setDailyList(resp.data.data.dailySongs)
			}
		})
	}, [])

	return (
		<div className="m-daily">
			<div className="daily-info">
				<p className="daily-date">
					<span className="date">{today()}</span>
					<span> / </span>
					<span className="month">{getMonth()}</span>
				</p>
				<img src={bgUrl} className="bg-img" alt="" />
			</div>
			<div className="daily-main">
				<List list={dailyList} history={history} />
			</div>
		</div>
	)
}

export default React.memo(Daily)
