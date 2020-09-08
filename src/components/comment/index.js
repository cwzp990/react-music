import React, { useState, useEffect } from "react";
import CommentItem from "./comment-item";
import { api } from "../../api";

import './index.scss'

function Comment (props) {
  const { match } = props;
  const [comments, setComments] = useState([]);
  const [hotComments, setHotComments] = useState([]);
  const url_id = match.params.id;

  useEffect(() => {
    api.getCommentResource(url_id).then((resp) => {
      setComments(resp.data.comments);
      setHotComments(resp.data.hotComments);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-comment">
      <div className="container">
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
    </div>
  );
}

export default React.memo(Comment);
