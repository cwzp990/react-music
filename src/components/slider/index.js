
import React, { useEffect, useState, useRef } from "react"
import BScroll from "better-scroll"

import "./index.scss"

function Slider (props) {
	const { imgList } = props
	const [currentIndex, setCurrentIndex] = useState(0)

	return (
		<div className="slide-wrapper">
			<div className="slide-group">
				{imgList.map(item => (
					<div className="slide-item" key={item.bannerId}>
						<img src={item.pic} alt="" />
					</div>
				))}
			</div>

			<div className="dots">
				{imgList.map((item, index) => (
					<span className={index === currentIndex ? "active dot" : "dot"} key={index} />
				))}
			</div>
		</div>
	)
}

export default React.memo(Slider)
