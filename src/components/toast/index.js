import React from "react";

function Toast(props) {
  const { isLoading, error } = props;
  return (
    <div className="m-toast">
      {isLoading && (
        <p className="icon-wrapper">
          <i className="iconfont icon-loading"></i>
        </p>
      )}
      <p className="tips">{isLoading ? "正在加载..." : error}</p>
    </div>
  );
}

export default React.memo(Toast);
