import React, { useState } from "react"
import { Player } from "video-react"
import { convertCount, formatPlayTime } from "../../utils";

import "./mv-item.scss"
import { api } from "../../api";

function MVItem(props) {
  const { list } = props
  const [url, setUrl] = useState('')

  const onPlay = (id) => {
    api.getMVPlay(id).then(resp => {
      setUrl(resp.data.data.url)
    })
  }

	return (
		<div className="m-mv">
			<ul className="mv-wrapper container">
				{list.map(i => (
					<li className="mv-item" key={i.id} onClick={() => onPlay(i.id)}>
						<div className="video-wrapper">
							<Player playsInline poster={i.cover} src={url} />
							<span className="count">
                <i className="iconfont icon-play"></i>{convertCount(i.playCount)}
              </span>
							<span className="time">{formatPlayTime(i.duration / 1000)}</span>
						</div>
						<p className="mv-info">
							<span className="title more">{i.name}</span>
							<span className="name more">{i.artistName}</span>
						</p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default React.memo(MVItem)
