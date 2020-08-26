import React, { useState, useEffect } from "react";
import List from "../../components/list";
import Info from "../../components/songlist/info"
import { convertCount } from "../../utils";

import { api } from "../../api";

import "./index.scss";

function SongListDetail (props) {
  const { history, match } = props;

  const url_id = match.params.id;
  const [isShow, setIsShow] = useState(false);
  const [songlist, setSonglist] = useState({});
  const {
    creator = {},
    tracks = [],
    name,
    coverImgUrl,
    description,
    playCount,
    subscribedCount,
  } = songlist;

  useEffect(() => {
    api.getPlaylistDetailResource(url_id).then((resp) => {
      setSonglist(resp.data.playlist);
    });
  }, [url_id]);

  const onInfo = () => {
    setIsShow(true)
  }

  return (
    <div className="m-songlist-details">
      <div className="songlist-info" onClick={() => onInfo()}>
        <div className="cover">
          <img src={coverImgUrl} alt="" />
          <span className="count">
            <i className="iconfont icon-play"></i>
            {convertCount(playCount)}
          </span>
        </div>
        <div className="info">
          <p className="title more">{name}</p>
          <p className="creator">
            <span className="avatar-wrapper">
              <img src={creator.avatarUrl} alt="" />
            </span>
            <span className="name">
              {creator.nickname}
              <i className="iconfont icon-right"></i>
            </span>
          </p>
          <p className="desc">{description}</p>
        </div>

        <div className="bg-img">
          <img src={coverImgUrl} alt="" />
        </div>
      </div>
      <div className="songlist-main">
        <List list={tracks} subscribed={subscribedCount} history={history} />
      </div>

      {isShow && <Info info={songlist} />}
    </div>
  );
}

export default React.memo(SongListDetail);
