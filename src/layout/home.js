import React from "react"
import { renderRoutes } from "react-router-config"
import Transition from '../components/transition'
import Scroll from '../components/scroll'
import Header from "../components/header"
import Footer from "../components/footer"
import Player from "../components/player"

import "./index.scss"

function Home (props) {
	const { route } = props

	const onPullUp = () => {
		console.log(111)
	}

	const onPullDown = () => {
		console.log(222)
	}

	return (
		<div className="music-wrapper">
			<Header />
			<div className="music-main">
				<Scroll pullUp={onPullUp} pullDown={onPullDown}>
					<div className="scroll-wrapper">
						<Transition>
							{renderRoutes(route.routes)}
						</Transition>
					</div>
				</Scroll>
			</div>
			<Footer />
			<Player />
		</div>
	)
}

export default React.memo(Home)
