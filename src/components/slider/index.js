
import React, { useEffect, useState, useRef } from "react"
import BScroll from "better-scroll"

import "./index.scss"

function Slider (props) {
	const { imgList } = props

	const [currentIndex, setCurrentIndex] = useState(0)
	const [slide, setSlide] = useState(null)
	const slideWrapper = useRef()

	useEffect(() => {
		const bs = new BScroll(slideWrapper.current, {
			scrollX: true,
			scrollY: false,
			momentum: false,
			snap: {
				loop: true,
				threshold: 0.1,
				speed: 400
			},
			bounce: false,
			stopPropagation: true
		})
		setSlide(bs)

		return () => {
			setSlide(null)
		}
	}, [imgList])

	return (
		<div className="slide-wrapper" ref={slideWrapper}>
			<ul className="slide-group">
				{imgList.map(item => (
					<li className="slide-item" key={item.bannerId}>
						<img src={item.pic} alt="" />
					</li>
				))}
			</ul>

			<div className="dots">
				{imgList.map((item, index) => (
					<span className={index === currentIndex ? "active dot" : "dot"} key={index} />
				))}
			</div>
		</div>
	)
}

export default React.memo(Slider)
