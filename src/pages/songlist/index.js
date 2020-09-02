
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Box from "../../components/songlist-box"
import Header from "../../components/header"
import { setCategory } from "../../store/actions"
import { api } from "../../api"

import "./index.scss"

function SongList (props) {
	const [hotCategory, setHotCategory] = useState([])
	const [squareList, setSquareList] = useState([])

	const { history } = props
	const { category, setCategoryDispatch } = props

	useEffect(() => {
		api.getCategoryHotPlaylist().then(resp => {
			let list = resp.data.tags.map(i => i.name)
			setHotCategory(list)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onDetails = cat => {
		setCategoryDispatch(cat)
	}

	const goToAll = () => {
		history.push("/classify")
	}

	useEffect(() => {
		api.getTopPlaylistResource(category).then(resp => {
			setSquareList(resp.data.playlists)
		})
	}, [category])

	return (
		<div className="m-square">
			<Header history={history}>
				<i></i>
				<p className="header-title" key="main">
					{category === '全部' ? '歌单广场' : category}
				</p>
				<i></i>
			</Header>
			<div className="square-category">
				<div className="cat-wrapper">
					{hotCategory.map((name, index) => (<span className={category === name ? 'current' : ''} onClick={() => onDetails(name)} key={index}>{name}</span>))}
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

//映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
	category: state.category,
})

//映射dispatch到props上
const mapDispatchToProps = dispatch => ({
	setCategoryDispatch: status => {
		dispatch(setCategory(status))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SongList))
