import React, { useEffect, useState, useRef } from "react"
import BScroll from "better-scroll"

import "./index.scss"

function Slider (props) {
	const [currentPageIndex, setCurrentPageIndex] = useState(0)
	const scrollContainerRef = useRef()
	const { imgList } = props

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="slider-wrapper">
			<div className="banner-wrapper">
				<div className="slider-banner-scroll" ref={scrollContainerRef}>
					<div className="slider-banner-wrapper">
						{imgList.map(img => (
							<div className="slider-item" key={img.bannerId}>
								<img src={img.pic} alt="推荐" />
							</div>
						))}
					</div>

					<div className="docs-wrapper">
						{imgList.map((img, index) => (
							<span className={`doc ${currentPageIndex === index ? "active" : ""}`} key={img.bannerId}></span>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default React.memo(Slider)
