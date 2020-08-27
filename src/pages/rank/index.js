import React, { useEffect, useState } from "react"
import { api } from '../../api'
import Box from '../../components/songlist-box'
import Header from '../../components/header'

import './index.scss'

function Rank (props) {
	const { history } = props

	const [rankList, setRankList] = useState([])

	useEffect(() => {
		api.getTopListResource().then(resp => {
			setRankList(resp.data.list)
		})
	}, [])

	return <div className="m-rank">
		<Header history={history}>
			<i></i>
			<p className="header-title" key="main">排行榜</p>
			<i></i>
		</Header>
		<div className="ranklist-wrapper container">
			{rankList.map(list => (<div className="box-wrapper" key={list.id}>
				<Box info={list} history={history}></Box></div>))}
		</div>
	</div>
}

export default React.memo(Rank)