import React from "react"

function SongListInfo(props) {
	const { info } = props
	return (
		<div className="m-songlist-info">
			{/* <div>
				<img src="" alt="" />
			</div>
			<h3></h3>
			<p>
				<span>标签：</span>
				{tag.map((t, i) => (
					<span className="tag" key={i}>
						{t}
					</span>
				))}
			</p> */}
		</div>
	)
}

export default React.memo(SongListInfo)
