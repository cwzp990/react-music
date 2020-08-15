import React, { useEffect } from "react"
import BScroll from "better-scroll"

function Scroll (props) {
	const { list } = props

	const onSelect = () => {

	}

	useEffect(() => {
		const scroll = new BScroll(, {
			scrollY: true,
			click: true,
			probeType: 3
		})

		return () => {
			scroll.destroy()
		}
	}, [])

	return <div class="m-scroll">
		<div class="scroll-wrapper" ref="scroll">
			<div class="scroll-content">
				{list.map((item, index) => (<div className="scroll-item" onClick={onSelect} key={index}>{item}</div>))}
			</div>
		</div>
	</div >
}

export default React.memo(Scroll)
