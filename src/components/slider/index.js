
import React, { useEffect, useState, useRef } from "react"
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import "./index.scss"

BScroll.use(Slide)

function Slider (props) {
	const { imgList } = props

	const [currentIndex, setCurrentIndex] = useState(0)
	const slide = useRef(null)
	const slideWrapper = useRef(null)
	const slideGroup = useRef(null)

	useEffect(() => {
		initWidth()
	}, [imgList])

	useEffect(() => {
		if (!slideWrapper.current) return
		slide.current = new BScroll(slideWrapper.current, {
			scrollX: true,
			scrollY: false,
			slide: true,
			useTransition: true,
			momentum: false,
			bounce: false,
			stopPropagation: true,
			probeType: 2
		})

		slide.current.on('slideWillChange', (page) => {
			setCurrentIndex(page.pageX)
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [slideWrapper.current])

	const initWidth = () => {
		let slideWidth = slideWrapper.current.clientWidth
		let slideList = slideGroup.current
		let width = 0
		if (slideList.children.length) {
			for (let i = 0; i < slideList.children.length; i++) {
				let child = slideList.children[i]
				child.style.width = `${slideWidth}px`
				width += slideWidth
			}
		}
		if (slideList.children.length > 1) {
			width += 2 * slideWidth
		}
		slideList.style.width = `${width}px`
	}

	return (
		<div className="slide-wrapper" ref={slideWrapper}>
			<ul className="slide-group" ref={slideGroup}>
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
