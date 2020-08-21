import React from "react"
import { renderRoutes } from "react-router-config"
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Footer from "../components/footer"
import Player from "../components/player"

import "./index.scss"

function Home (props) {
	const { route, location } = props

	return (
		<div className="music-wrapper">
			<TransitionGroup className={'router-wrapper'}>
				<CSSTransition timeout={500} key={location.pathname}>
					<div className="music-main">{renderRoutes(route.routes)}</div>
					<Footer />
					<Player />
				</CSSTransition>
			</TransitionGroup>

		</div>
	)
}

export default React.memo(Home)
