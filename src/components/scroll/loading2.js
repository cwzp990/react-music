import React from 'react';
import './loading.scss';

function LoadingV2 () {
  return (
    <div className="loading2-wrapper">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span>拼命加载中...</span>
    </div>
  );
}

export default React.memo(LoadingV2);