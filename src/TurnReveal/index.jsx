// Adapted from https://codepen.io/noeldelgado/pen/pGwFx

import React from "react";
import styled, { css, keyframes } from "styled-components";
import * as PropTypes from "prop-types";
import { useSize } from "react-use";

import Transition from "src/Transition";
import Direction from "src/Direction";

// noinspection JSUnusedGlobalSymbols
const TurnReveal = ({
  transition,
  direction,
  perspective,
  className,
  children
}) => {
  const [sized, { width, height }] = useSize(() => <Sized />);

  const hideAngles = {
    horizontal: `${getOutAngle(width, perspective)}rad`,
    vertical: `${getOutAngle(height, perspective)}rad`
  };

  let style = { position: "absolute" };
  if (!className) style = { ...style, ...TurnReveal.defaultLayout };

  return (
    <>
      {sized}
      <Animated
        transition={transition}
        direction={direction}
        hideAngles={hideAngles}
        className={className}
        style={style}
      >
        {children}
      </Animated>
    </>
  );
};

// Disable react/static-property-placement, because docz will crash, because of the dynamic transition and direction prop types
// See https://github.com/pedronauck/docz/issues/691
// eslint-disable-next-line react/static-property-placement
TurnReveal.propTypes = {
  /** The transition to run. Options are defined in src/Transition. */
  transition: PropTypes.oneOf(Object.keys(Transition)).isRequired,
  /** The direction in which to run the transition. Options are defined in src/Direction. */
  direction: PropTypes.oneOf(Object.keys(Direction)).isRequired,
  /** The perspective distance in number of pixels. */
  perspective: PropTypes.number.isRequired,
  /** A class name to give give the animated element and the placeholder element used as reference of the dimensions of the animated element.
   * 	See the combining example below. */
  className: PropTypes.string,
  /** The animated element. */
  children: PropTypes.node.isRequired
};

TurnReveal.defaultLayout = { width: "100%", height: "100%" };

export default TurnReveal;

const Sized = styled.div`
  width: 100%;
  height: 100%;
  position: absolute !important;
`;

const Animated = styled.div`
  ${props => animationProperties(props)}
`;

const directionTransforms = {
  right: { x: "100%", y: "0%" },
  top: { x: "50%", y: "0%" },
  left: { x: "0%", y: "0%" },
  bottom: { x: "50%", y: "100%" }
};

const getOutAngle = (size, perspective) => {
  return Math.atan2(size / 2, perspective) + 0.5 * Math.PI;
};

const animationProperties = props => {
  const directionTransform = directionTransforms[props.direction];

  return css`
    transform-origin: ${directionTransform.x} ${directionTransform.y};
    animation: ${turnAnimation(props)} 300ms ease 0ms 1 forwards;
  `;
};

const turnAnimation = ({
  transition,
  direction,
  hideAngles: { vertical, horizontal }
}) => {
  const horizontalVector = [
    0,
    direction === Direction.right ? -1 : 1,
    0,
    horizontal
  ];
  const verticalVector = [direction === Direction.top ? -1 : 1, 0, 0, vertical];

  const hiddenVector =
    direction === Direction.right || direction === Direction.left
      ? horizontalVector
      : verticalVector;

  // Disable one-var, because horizontalVector and verticalVector would get a mismatched update and query warning.
  // See https://youtrack.jetbrains.com/issue/WEB-40325.
  // eslint-disable-next-line one-var
  const visibleVector = [0, 0, 0, 0],
    { fromVector, toVector, fromVisibility, toVisibility } =
      transition === Transition.hide
        ? {
            fromVector: visibleVector,
            toVector: hiddenVector,
            fromVisibility: "visible",
            toVisibility: "hidden"
          }
        : {
            fromVector: hiddenVector,
            toVector: visibleVector,
            fromVisibility: "hidden",
            toVisibility: "visible"
          };

  const toTransformString = vector => `transform: rotate3d(${vector.join()})`;

  return keyframes`
			from {
				visibility: ${fromVisibility};
				${toTransformString(fromVector)};
			}
			to {
				visibility: ${toVisibility};
				${toTransformString(toVector)};
			}
		`;
};
