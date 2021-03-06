# Unmaintained. See notice below

## react-turn-reveal

[![npm (scoped)](https://img.shields.io/npm/v/@cdfa/react-turn-reveal)](https://www.npmjs.com/package/@cdfa/react-turn-reveal)
[![CircleCI](https://img.shields.io/circleci/build/github/cdfa/react-turn-reveal)](https://circleci.com/gh/cdfa/react-turn-reveal)
[![CodeCov](https://img.shields.io/codecov/c/github/cdfa/react-turn-reveal)](https://codecov.io/gh/cdfa/react-turn-reveal)
[![LGTM](https://img.shields.io/lgtm/grade/javascript/github/cdfa/react-turn-reveal)](https://lgtm.com/projects/g/cdfa/react-turn-reveal/alerts/)
[![DeepScan grade](https://deepscan.io/api/teams/4893/projects/6663/branches/57089/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=4893&pid=6663&bid=57089)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> A 3D reveal animation library for React.

This project started when I thought I could pull something I made into a package easily.
However, during the development, I started to take it on as a challenge to create the most comprehensive development environment I could.
After a long time, I finally published the project. All was well.

However, a year later, I wanted to update to `docz` 2, since this would resolve various issues I had ran into and improve the documentation.
My progress can be viewed on the `feature/docz-2` branch, but apparently I have also created dependency hell with my comprehensive development environment.

As much as I would like to fix it, I have better things to do with my time.
Feel free to take over the project if you want. There is surprisingly little actual code :)

## Install

```bash
npm install --save react-turn-reveal
```

## Usage

See [the interactive documentation](https://cdfa.github.io/react-turn-reveal/) for demonstrative usage examples.

### TurnReveal

```jsx
import TurnReveal, { Direction, Pose } from "react-turn-reveal";

const perspective = 400;

const YourComponent = () => (
  <div style={{ position: "relative", perspective: perspective + "px" }}>
    <TurnReveal
      pose={Pose.closed}
      direction={Direction.right}
      perspective={perspective}
    >
      <div>Lorem ipsum</div>
    </TurnReveal>
    <img src="background.png" alt="background" />
  </div>
);
```

### FollowReveal

```jsx
import FollowReveal from "react-turn-reveal";

const perspective = 400;

const YourComponent = (
  <div style={{ position: "relative", perspective: perspective + "px" }}>
    <FollowReveal perspective={perspective}>
      <div>Lorem ipsum</div>
    </FollowReveal>
    <img src="background.png" alt="background" />
  </div>
);
```

## Acknowledgements

Adapted from <https://codepen.io/noeldelgado/pen/pGwFx>

## Limitations

- Special perspective styling (like `perspective-origin) is not taken into account. (PR's for this are welcome)
- A separate element is needed to catch mouse events and measure the size of the animated component.
  In order to allow multiple reveals to use the same perspective container any layout styling applied to
  the animated element has to be duplicated for the separate elements with the `className` prop.
  It is still possible to use one perspective container per animated component and put these in the desired layout,
  which doesn't require passing the `className` for that layout. (See the FollowReveal Grid example)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

GNU GPL v3.0 © [cdfa](https://github.com/cdfa)
