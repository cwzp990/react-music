import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { api } from "../../api"

import List from "../../components/list"

import "./singer-info.scss"

function SingerInfo (props) {
	const { history } = props
	const { currentSinger } = props

	const [info, setInfo] = useState({})
	const [hotList, setHotList] = useState([])

	const { id, name, img1v1Url } = currentSinger
	const { briefDesc } = info

	useEffect(() => {
		if (!id) return
		api.getSingerHotSong(id).then(resp => {
			setHotList(resp.data.songs)
		})
		api.getArtistDescResource(id).then(resp => {
			setInfo(resp.data)
		})
	}, [id])

	const onBack = () => {
		history.goBack()
	}

	return (
		<div className="m-singer-info">
			<div className="singer-info">
				<i className="iconfont icon-left back" onClick={onBack}></i>
				<div className="singer container">
					<p className="name">{name}</p>
					<p className="brief">{briefDesc}</p>
				</div>

				<img className="singer-img" src={img1v1Url} alt="" />
			</div>

			<div className="singer-list">
				<List list={hotList} history={history} />
			</div>
		</div>
	)
}

//映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
	currentSinger: state.currentSinger,
})

export default connect(mapStateToProps, null)(React.memo(SingerInfo))
