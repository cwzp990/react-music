import React from "react"
import { convertCount } from '../../utils'

import './index.scss'

function SongListBox (props) {

  const { info, history } = props

  const { coverImgUrl, picUrl, playCount, updateFrequency, name, id } = info

  const goToSongList = (id) => {
    history.push(`/list_detail/${id}`)
  }

  return <div className="songlist-box" onClick={() => goToSongList(id)}>
    <div className="img-wrapper">
      <img src={coverImgUrl || picUrl} alt="歌单" />
      <span className="count"><i className="iconfont icon-play-hollow"></i>{convertCount(playCount)}</span>
      <span className="sub">{updateFrequency}</span>
    </div>
    <p className="title">{name}</p>
  </div>
}

export default React.memo(SongListBox)