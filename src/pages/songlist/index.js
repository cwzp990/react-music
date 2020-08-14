import React from "react"
import { renderRoutes } from 'react-router-config';

function SongList (props) {
	return (
		<div className="m-square">
			<p>这是歌单广场</p>
			{renderRoutes(props.route.routes)}
		</div>
	)
}

export default React.memo(SongList)