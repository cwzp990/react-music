import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Switch, Route, withRouter } from "react-router-dom";

import "./index.scss";

/**
 *
 * @param {way} props
 * @description 用于页面路由跳转 通过way指定跳转方式，指定way=refade
 * 则反向
 *
 */
const ANIMATION_MAP = {
  PUSH: "fade",
  POP: "refade",
};

function Transition (props) {
  const { children } = props;
  // console.log(props.history.action);
  // 根据动作自行判断前进和后退
  /*使用React.cloneElement API对props中的classNames这一props进行修改 */
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup
          childFactory={(child) =>
            React.cloneElement(child, {
              classNames: ANIMATION_MAP[props.history.action],
            })
          }
        >
          <CSSTransition timeout={500} key={location.pathname}>
            <Switch location={location}>{children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    ></Route>
  );
}

export default withRouter(Transition);