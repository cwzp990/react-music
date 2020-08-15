import React, { useState, useEffect } from "react"

import './index.scss'
import { api } from "../../api"

function Singer () {
  const [singerList, setSingerList] = useState([])
  const [area, setArea] = useState(-1)
  const [type, setType] = useState(-1)

  useEffect(() => {
    api.getTopArtistsResource().then(resp => {
      setSingerList(resp.data.artists)
    })
  }, [])

  useEffect(() => {
    api.getArtList(area, type).then(resp => {
      setSingerList(resp.data.artists)
    })
  }, [area, type])

  const changeArea = (area) => {
    setArea(area)
  }
  const changeType = (type) => {
    setType(type)
  }

  return <div className="m-singer">
    <div className="m-category">
      <p>
        <span onClick={() => changeArea(7)}>华语</span>
        <span onClick={() => changeArea(96)}>欧美</span>
        <span onClick={() => changeArea(8)}>日本</span>
        <span onClick={() => changeArea(16)}>韩国</span>
        <span onClick={() => changeArea(0)}>其他</span>
      </p>
      <p>
        <span onClick={() => changeType(1)}>男</span>
        <span onClick={() => changeType(2)}>女</span>
        <span onClick={() => changeType(3)}>乐队/组合</span>
      </p>
    </div>


  </div>
}

export default React.memo(Singer)