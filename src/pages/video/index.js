import React, { useEffect, useState } from "react"
import Header from '../../components/header'
import { api } from "../../api"

import './index.scss'

function Video (props) {
	const { history } = props
	const [tag, setTag] = useState([])

	useEffect(() => {
		api.getVideoList().then(resp => {
			let tags = resp.data.data.filter(i => i.name.length <= 3)
			setTag(tags)
		})
	}, [])

	const onSearch = () => {
		history.push('/search')
	}

	const goToSinger = () => {
		history.push('/singer')
	}

	return <div className="m-video">
		<Header>
			<input className="search-box" placeholder="随便搜搜吧 ┑(￣Д ￣)┍" onFocus={onSearch} key="main" />
			<i className="iconfont icon-person" onClick={goToSinger} key="right"></i>
		</Header>
		<div className="square-category">
			<div className="cat-wrapper">
				{tag.map(i => (<span key={i.id}>{i.name}</span>))}
			</div>
		</div>
	</div>
}

export default React.memo(Video)
