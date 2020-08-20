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

	const onBack = () => {
		history.goBack()
	}

	return <div className="m-rank">
		<Header>
			<i className="iconfont icon-left" onClick={onBack} key="left"></i>
			<p className="header-title" key="main">排行榜</p>
			<p key="right">
				<img src="" alt="" />
			</p>
		</Header>
		<div className="ranklist-wrapper container">
			{rankList.map(list => (<div className="box-wrapper" key={list.id}>
				<Box info={list} history={history}></Box></div>))}
		</div>
	</div>
}

export default React.memo(Rank)