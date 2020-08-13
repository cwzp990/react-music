import React from "react"
import { renderRoutes } from 'react-router-config';

function SongList (props) {
	return (
		<div>
			<p>我是歌单</p>
			{renderRoutes(props.route.routes)}
		</div>
	)
}

export default React.memo(SongList)