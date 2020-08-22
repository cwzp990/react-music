import React from "react";
import "./comment-item.scss";

import {convertCount, formatDate} from '../../utils'

function CommentItem(props) {
  const { info } = props;
  const { user = {}, time, content, liked, likedCount } = info;

  return (
    <div className="item-comment">
      <p className="avatar">
        <img src={user.avatarUrl} alt="" />
      </p>
      <div className="main">
        <div className="userinfo">
          <div>
            <p className="name">{user.nickname}</p>
            <p className="time">{formatDate(time)}</p>
          </div>
          <p>
            <span className="count">{convertCount(likedCount)}</span>
            <i className={liked ? 'iconfont icon-like red' : 'iconfont icon-like'}></i>
          </p>
        </div>
        <p className="content">{content}</p>
        <p></p>
      </div>
    </div>
  );
}

export default React.memo(CommentItem);
