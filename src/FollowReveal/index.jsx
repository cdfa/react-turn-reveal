import React from "react";
import * as PropTypes from "prop-types";

import TurnReveal from "src/TurnReveal";
import Transition from "src/Transition";
import Direction from "src/Direction";

// noinspection JSUnusedGlobalSymbols
export default class FollowReveal extends React.Component {
  static propTypes = {
    /** The perspective distance in number of pixels. */
    perspective: PropTypes.number.isRequired,
    /** A class name to give give the animated element and the placeholder element used as reference of the dimensions of the animated element.
     * 	See the combining example in the `TurnReveal` docs. */
    className: PropTypes.string,
    /** The animated element. */
    children: PropTypes.node.isRequired
  };

  state = {
    transition: Transition.hide,
    direction: Direction.right
  };

  revealRef = React.createRef();

  followMouse = (event, transition) => {
    event.preventDefault();
    this.setState({
      transition,
      direction: getClosestEdge(event, this.revealRef.current)
    });
  };

  render() {
    const {
      state: { transition, direction },
      props: { perspective, className, children }
    } = this;

    let style = { position: "absolute" };
    if (!className) style = { ...style, ...TurnReveal.defaultLayout };

    return (
      <>
        <TurnReveal
          transition={transition}
          direction={direction}
          perspective={perspective}
          className={className}
        >
          {children}
        </TurnReveal>
        <div
          onMouseEnter={e => this.followMouse(e, Transition.show)}
          onMouseLeave={e => this.followMouse(e, Transition.hide)}
          ref={this.revealRef}
          style={style}
        />
      </>
    );
  }
}

const getClosestEdge = (event, element) => {
  const { width, height, top, left } = element.getBoundingClientRect();
  const l = event.pageX - (left + window.pageXOffset);
  const t = event.pageY - (top + window.pageYOffset);

  const closestHorizontalEdge =
    t > 0.5 * height
      ? { edge: Direction.bottom, distance: height - t }
      : {
          edge: Direction.top,
          distance: t
        };
  const closestVerticalEdge =
    l > 0.5 * width
      ? { edge: Direction.right, distance: width - l }
      : {
          edge: Direction.left,
          distance: l
        };

  return closestHorizontalEdge.distance < closestVerticalEdge.distance
    ? closestHorizontalEdge.edge
    : closestVerticalEdge.edge;
};
