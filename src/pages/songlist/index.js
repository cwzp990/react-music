
import React, { useState, useEffect } from "react"
import Box from "../../components/songlist-box"
import Header from "../../components/header"
import { api } from "../../api"

import "./index.scss"

function SongList (props) {
	const [hotCategory, setHotCategory] = useState([])
	const [squareList, setSquareList] = useState([])

	const { history } = props

	useEffect(() => {
		api.getCategoryHotPlaylist().then(resp => {
			let list = resp.data.tags.map(i => i.name)
			setHotCategory(list)
		})

		onDetails(hotCategory[0])
	}, [hotCategory])

	const onDetails = cat => {
		api.getTopPlaylistResource(cat).then(resp => {
			setSquareList(resp.data.playlists)
		})
	}

	const goToAll = () => {
		history.push("/classify")
	}

	return (
		<div className="m-square">
			<Header history={history}>
				<i></i>
				<p className="header-title" key="main">歌单广场</p>
				<i></i>
			</Header>
			<div className="square-category">
				<div className="cat-wrapper">
					{hotCategory.map((name, index) => (<span onClick={() => onDetails(name)} key={index}>{name}</span>))}
				</div>
				<i className="iconfont icon-category" onClick={goToAll}></i>
			</div>
			<div className="m-rank">
				<div className="ranklist-wrapper container">
					{squareList.map(list => (
						<div className="box-wrapper" key={list.id}>
							<Box info={list} history={history}></Box>
						</div>
					))}
				</div>
			</div>
		</div >
	)
}

export default React.memo(SongList)
