import React from "react"
import { renderRoutes } from "react-router-config"
import Transition from '../components/transition'
import Footer from "../components/footer"
import Player from "../components/player"

import "./index.scss"

function Home (props) {
	const { route } = props

	return (
		<div className="music-wrapper">
			<div className="music-main">
				<Transition>
					{renderRoutes(route.routes)}
				</Transition>
			</div>
			<Footer />
			<Player />
		</div>
	)
}

export default React.memo(Home)
