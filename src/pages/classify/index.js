import React, { useEffect, useState } from "react"
import { api } from "../../api"

function Classify(props) {
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

	return (
		<div className="m-classify">
			{cat.map(i => (
				<div>
					<p>{i.name}</p>
					<ul>
						{i.list.map(j => (
							<li>
								{j.hot && <i className="iconfont icon-hot"></i>}
								<span>{j.name}</span>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default React.memo(Classify)
