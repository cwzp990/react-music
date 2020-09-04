
import React, { useEffect, useState, useRef } from "react"
import BScroll from "better-scroll"

import "./index.scss"

function Slider (props) {
	const { imgList } = props

	const [currentIndex, setCurrentIndex] = useState(0)
	const [slide, setSlide] = useState(null)
	const [timer, setTimer] = useState(null)
	const slideWrapper = useRef()
	const slideGroup = useRef()

	useEffect(() => {
		initWidth()
	}, [imgList])

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

		const dom = slideWrapper.current
		dom.addEventListener("touched", _touchEndEvent, false)

		return () => {
			dom.removeEventListener('touched', _touchEndEvent, false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!slide) return
		_play()
		slide.goToPage(currentIndex, 0, 0)
		slide.on('scrollEnd', _onScrollEnd)
		slide.on('beforeScrollStart', () => {
			setTimer(null)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [slide])

	// 触摸事件
	const _touchEndEvent = () => {
		if (!slide) return
		_play()
	}

	// 滚动结束事件
	const _onScrollEnd = () => {
		let pageIndex = slide.getCurrentPage().pageX
		setCurrentIndex(pageIndex)
		_play()
	}

	// 自动切换
	const _play = () => {
		if (timer) setTimer(null)
		const slideTimer = setTimeout(() => {
			slide && slide.next()
		}, 1000)
		setTimer(slideTimer)
	}

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
