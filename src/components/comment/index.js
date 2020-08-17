import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import CommentItem from "./comment-item";
import { api } from "../../api";

import './index.scss'

function Comment(props) {
  const { history, match } = props;
  const [comments, setComments] = useState([]);
  const [hotComments, setHotComments] = useState([]);
  const url_id = match.params.id;

  const onBack = () => {
    history.goBack();
  };

  useEffect(() => {
    api.getCommentResource(url_id).then((resp) => {
      setComments(resp.data.comments);
      setHotComments(resp.data.hotComments);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-comment">
      <Header>
        <i className="iconfont icon-left" onClick={onBack} key="left"></i>
        <p className="comment-title" key="main">评论</p>
      </Header>

      <div>
        <p>
          <img src="" alt="" />
        </p>
        <p>
          <span></span>
          <span></span>
        </p>
      </div>

      <p>精彩评论 ({hotComments.length})</p>
      <ul>
        {hotComments.map((i) => (
          <li key={i.commentId}>
            <CommentItem info={i} />
          </li>
        ))}
      </ul>

      <p>最新评论 ({comments.length})</p>
      <ul>
        {comments.map((i) => (
          <li key={i.commentId}>
            <CommentItem info={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Comment);
