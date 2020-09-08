import React, { useEffect, useState } from "react"
import { api } from '../../api'
import Box from '../../components/songlist-box'

import './index.scss'

function Rank (props) {
	const { history } = props

	const [rankList, setRankList] = useState([])

	useEffect(() => {
		api.getTopListResource().then(resp => {
			if (resp.data.code === 200) {
				setRankList(resp.data.list)
			}
		})
	}, [])

	return <div className="m-rank">
		<div className="ranklist-wrapper container">
			{rankList.map(list => (<div className="box-wrapper" key={list.id}>
				<Box info={list} history={history}></Box></div>))}
		</div>
	</div>
}

export default React.memo(Rank)