This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Try a live version of the application [here](https://fispe.github.io/react-rubik-cube/)

## React Rubik Cube

Web application that renders a playable version of a Rubik Cube in a 3D environment

With this project I wanted to go one step further and I learned how to use three.js. It is implemented using the [React Three Fiber library](https://github.com/pmndrs/react-three-fiber)

- React
- React Three Fiber
- Functional components, hooks and custom hooks

## Game functionalities

- Controls

To displace a row or a column, click and drag in the axis direction of the expected movement. The minimum and maximum movement is a quarter turn each time <br />
To rotate the camera, simply click and drag outside the rubik cube. <br />

- Options

Shuffle: randomly shuffles the cube. <br />
Solve: traces back all movements to the beginning (there is not a solving algorithm implemented).<br />
Undo: returns back one movement.<br />
Redo: repeats an undone movement.<br />

## To do, or improve

- Winning status recognition.<br />
- Implementation of solving algorithms.<br />
- Fix for a bug when changing the axis when dragged in one movement.<br />




