import React from "react"

import './index.scss'

function SongListBox (props) {

  const { imgUrl, count, sub, title, id } = props

  const goToSongList = (id) => {
    props.history.push(`/songlist/detail/${id}`)
  }

  return <div className="songlist-box" onClick={() => goToSongList(id)}>
    <div className="img-wrapper">
      <img src={imgUrl} width="100%" height="100%" alt="歌单" />
      <span className="count">{count}</span>
      <span className="sub">{sub}</span>
    </div>
    <p className="title">{title}</p>
  </div>
}

export default React.memo(SongListBox)