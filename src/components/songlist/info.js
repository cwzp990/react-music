import React from "react"

import './info.scss'

function SongListInfo (props) {
	const { info } = props
	const { coverImgUrl, name, tags, description } = info

	return (
		<div className="m-songlist-info">
			<div className="info-wrapper">
				<div className="cover">
					<img src={coverImgUrl} alt="" />
				</div>

				<h3 className="title">{name}</h3>

				<p className="tags">
					<span>标签：</span>
					{tags.map((t, i) => (
						<span className="tag" key={i}>
							{t}
						</span>
					))}
				</p>

				<p className="desc">{description}</p>

				<p className="bg-img">
					<img src={coverImgUrl} alt="" />
				</p>
			</div>
		</div>
	)
}

export default React.memo(SongListInfo)
