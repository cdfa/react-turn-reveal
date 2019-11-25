import styled from "styled-components";
import transpose from "object-transpose";
import React from "react";

import Direction from "src/Direction";
import Pose from "src/Pose";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    ". top ."
    "left reveal right"
    ". bottom .";
`;

const RevealWrapper = styled.div`
  grid-area: reveal;
  place-self: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const directions = Object.keys(Direction)
  // Remove __filemeta property from docz, see https://github.com/pedronauck/docz/issues/875
  .filter(direction => direction !== "__filemeta");

const arrows = ["→", "↑", "←", "↓"];

// eslint-disable-next-line react/prop-types
const ControlWrapper = ({ pose, updateReveal, children }) => (
  <Container>
    {transpose({
      direction: directions,
      place: ["center left", "end center", "center right", "start center"],
      text: pose === Pose.closed ? arrows : arrows.concat(arrows).slice(2, 6) // shift every element 2 positions counter-clockwise
    }).map(({ direction, place, text }) => (
      <button
        style={{
          gridArea: direction,
          placeSelf: place
        }}
        key={direction}
        onClick={() => updateReveal(Direction[direction])}
      >
        {text}
      </button>
    ))}
    <RevealWrapper>{children}</RevealWrapper>
  </Container>
);

export default ControlWrapper;
