import React, { useEffect, useState } from "react"
import Header from "../../components/header"
import { api } from "../../api"

import "./index.scss"

function Classify (props) {
	const { history } = props
	const [cat, setCat] = useState([])

	useEffect(() => {
		api.getCategoryPlayList().then(resp => {
			const language = resp.data.sub.filter(i => i.category === 0) // 语种
			const style = resp.data.sub.filter(i => i.category === 1) // 风格
			const scene = resp.data.sub.filter(i => i.category === 2) // 场景
			const emotion = resp.data.sub.filter(i => i.category === 3) // 情感
			const theme = resp.data.sub.filter(i => i.category === 4) // 主题
			setCat([
				{ name: "语种", list: language },
				{ name: "风格", list: style },
				{ name: "场景", list: scene },
				{ name: "情感", list: emotion },
				{ name: "主题", list: theme },
			])
		})
	}, [])

	const backToSquare = () => {

	}

	return (
		<div className="m-classify">
			<Header history={history}>
				<i></i>
				<p className="header-title" key="main">所有歌单</p>
				<i></i>
			</Header>
			<div className="classify-wrapper container">
				{cat.map(i => (
					<div className="row">
						<p className="title">{i.name}</p>
						<ul className="row-wrapper">
							{i.list.map(j => (
								<li className="item-classify" onClick={backToSquare}>
									{j.hot && <i className="iconfont icon-hot red"></i>}
									<span className="name">{j.name}</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	)
}

export default React.memo(Classify)
