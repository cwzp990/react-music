import React from "react"
import { convertCount } from '../../utils'

import './index.scss'

function SongListBox (props) {

  const { info, history } = props

  const { coverImgUrl, playCount, updateFrequency, name, id } = info

  const goToSongList = (id) => {
    history.push(`/songlist/detail/${id}`)
  }

  return <div className="songlist-box" onClick={() => goToSongList(id)}>
    <div className="img-wrapper">
      <img src={coverImgUrl} width="100%" height="100%" alt="歌单" />
      <span className="count"><i className="iconfont icon-play"></i>{convertCount(playCount)}</span>
      <span className="sub">{updateFrequency}</span>
    </div>
    <p className="title">{name}</p>
  </div>
}

export default React.memo(SongListBox)