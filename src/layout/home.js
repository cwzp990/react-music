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

	const handleScroll = () => { }
	const handlePullUp = () => { }
	const pullUpLoading = false

	return (
		<div className="music-wrapper">
			<Header />

			<div className="music-main">
				<Scroll
					onScroll={handleScroll}
					pullUp={handlePullUp}
					pullUpLoading={pullUpLoading}
					bounceTop={false}>
					<Transition>
						{renderRoutes(route.routes)}
					</Transition>
				</Scroll>
			</div>
			<Footer />
			<Player />
		</div>
	)
}

export default React.memo(Home)
