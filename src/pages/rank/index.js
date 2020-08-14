import React, { useEffect, useState } from "react"
import { api } from '../../api'
import Box from '../../components/songlist-box'

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
		{rankList.map(list => (<div className="box-wrapper" key={list.id}>
			<Box info={list} history={history}></Box></div>))}
	</div>
}

export default React.memo(Rank)