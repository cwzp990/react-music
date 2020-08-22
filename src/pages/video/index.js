import React, { useEffect, useState } from "react"
import Header from '../../components/header'
import MVItem from './mv-item'
import { api } from "../../api"

import './index.scss'

function Video (props) {
	const { history } = props
	const [MVList, setMVList] = useState([])
	const cat = ['全部', '内地', '港台', '欧美', '日本', '韩国']


	useEffect(() => {
		onSelect(cat[0])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onSearch = () => {
		history.push('/search')
	}

	const goToSinger = () => {
		history.push('/singer')
	}

	const onSelect = (val) => {
		api.getMvResource(val).then(resp => {
			setMVList(resp.data.data)
		})
	}

	return <div className="m-video">
		<Header>
			<input className="search-box" placeholder="随便搜搜吧 ┑(￣Д ￣)┍" onFocus={onSearch} key="main" />
			<i className="iconfont icon-person" onClick={goToSinger} key="right"></i>
		</Header>
		<div className="square-category">
			<div className="cat-wrapper">
				{cat.map((item, index) => (<span key={index} onClick={() => onSelect(item)}>{item}</span>))}
			</div>
		</div>

		<MVItem list={MVList} />
	</div>
}

export default React.memo(Video)
