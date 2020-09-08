import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { api } from "../../api"
import { setCategory } from "../../store/actions"

import "./index.scss"

function Classify (props) {
	const { history } = props
	const { setCategoryDispatch } = props
	const [cat, setCat] = useState([])

	useEffect(() => {
		api.getCategoryPlayList().then(resp => {
			if (resp.data.code === 200) {
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
			}
		})
	}, [])

	const backToSquare = (name) => {
		setCategoryDispatch(name)
		history.goBack()
	}

	return (
		<div className="m-classify">
			<div className="classify-wrapper container">
				{cat.map(i => (
					<div className="row">
						<p className="title">{i.name}</p>
						<ul className="row-wrapper">
							{i.list.map(j => (
								<li className="item-classify" onClick={() => backToSquare(j.name)}>
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

//映射dispatch到props上
const mapDispatchToProps = dispatch => ({
	setCategoryDispatch: status => {
		dispatch(setCategory(status))
	},
})

export default connect(null, mapDispatchToProps)(React.memo(Classify))
