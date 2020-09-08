import React, { useEffect, useState } from "react"
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

	const onSelect = (val) => {
		api.getMvResource(val).then(resp => {
			if (resp.data.code === 200) {
				setMVList(resp.data.data)
			}
		})
	}

	return <div className="m-video">
		<div className="square-category">
			<div className="cat-wrapper">
				{cat.map((item, index) => (<span key={index} onClick={() => onSelect(item)}>{item}</span>))}
			</div>
		</div>

		<MVItem list={MVList} />
	</div>
}

export default React.memo(Video)
