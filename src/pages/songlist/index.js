import React, { useState, useEffect } from "react"
import {renderRoutes} from 'react-router-config'
import Box from "../../components/songlist-box"
import { api } from "../../api"

import "./index.scss"

function SongList(props) {
	const [hotCategory, setHotCategory] = useState([])
	const [squareList, setSquareList] = useState([])

	const { history } = props

	useEffect(() => {
		api.getCategoryHotPlaylist().then(resp => {
			let list = resp.data.tags.map(i => i.name)
			setHotCategory(list)
		})

		onDetails()
	}, [])

	const onDetails = cat => {
		api.getTopPlaylistResource(cat).then(resp => {
			setSquareList(resp.data.playlists)
		})
	}

	return (
		<div className="m-square">
			<div className="square-category">
				<div className="cat-wrapper"></div>
				<i className="iconfont icon-menu"></i>
			</div>
			<div className="m-rank">
				{squareList.map(list => (
					<div className="box-wrapper" key={list.id}>
						<Box info={list} history={history} ></Box>
					</div>
				))}
			</div>
		</div>
	)
}

export default React.memo(SongList)
