import React from "react";
import * as PropTypes from "prop-types";

import TurnReveal from "src/TurnReveal";
import Pose from "src/Pose";
import Direction from "src/Direction";

import testIds from "../../testUtils/testIds";

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
    pose: Pose.out,
    direction: Direction.right
  };

  revealRef = React.createRef();

  followMouse = (event, pose) => {
    event.preventDefault();
    this.setState({
      pose,
      direction: getClosestEdge(event, this.revealRef.current)
    });
  };

  render() {
    const {
      state: { pose, direction },
      props: { perspective, className, children }
    } = this;

    let style = { position: "absolute" };
    if (!className) style = { ...style, ...TurnReveal.defaultLayout };

    return (
      <>
        <TurnReveal
          pose={pose}
          direction={direction}
          perspective={perspective}
          className={className}
        >
          {children}
        </TurnReveal>
        <div
          onMouseEnter={e => this.followMouse(e, Pose.closed)}
          onMouseLeave={e => this.followMouse(e, Pose.out)}
          ref={this.revealRef}
          style={style}
          data-testid={testIds.eventCatcher}
        />
      </>
    );
  }
}

const getClosestEdge = (event, element) => {
  const { width, height, top, left } = element.getBoundingClientRect();
  const l = event.clientX - left;
  const t = event.clientY - top;

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
