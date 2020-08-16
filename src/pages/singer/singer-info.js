import React, { useEffect, useState } from "react"
import { api } from "../../api"
import List from "../../components/list"

import "./singer-info.scss"

function SingerInfo(props) {
	const { match, history } = props
	const url_id = match.params.id
	const [info, setInfo] = useState({})
	const [hotList, setHotList] = useState([])
	const { briefDesc } = info

	useEffect(() => {
		api.getSingerHotSong(url_id).then(resp => {
			setHotList(resp.data.songs)
		})
		api.getArtistDescResource(url_id).then(resp => {
			setInfo(resp.data)
		})
	}, [url_id])

	return (
		<div className="m-singer-info">
			<div className="singer-info">
				<div class="singer">
					<p className="name">我是姓名</p>
					<p className="brief">{briefDesc}</p>
				</div>
			</div>

			<div className="singer-list">
				<List list={hotList} history={history} />
			</div>
		</div>
	)
}

export default React.memo(SingerInfo)
