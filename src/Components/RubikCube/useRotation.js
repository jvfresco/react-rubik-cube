import React, { useEffect, useReducer, useRef } from 'react'
import { MeshToonMaterial } from 'three'
import { maxKey } from './hooks.js'

function findDirection(cubeFaceClicked, rubikCubeSide, axisDisplaced, vectorDragged, previousDragged, direction){
  //Using the provided data find the direction the rubikcube must rotate
  //Direction need to be rectified in some situations in order to be intuitive for the user
  let foundDirection = (previousDragged.current 
                  ?  vectorDragged[axisDisplaced] - previousDragged.current[axisDisplaced] 
                  : vectorDragged[axisDisplaced])
                                              >= 0 
                                                ? 1 
                                                : -1                         
  if (
    (cubeFaceClicked == "z" && axisDisplaced == "y") ||
    (cubeFaceClicked == "x" && axisDisplaced == "y") ||
    (cubeFaceClicked == "y" && axisDisplaced == "x")
  )
    foundDirection *= -1;
  if (
    (cubeFaceClicked == "x" && rubikCubeSide === 1) ||
    (cubeFaceClicked == "y" && rubikCubeSide === -1) ||
    (cubeFaceClicked == "z" && rubikCubeSide === -1)
  )
    foundDirection *= -1;
    console.log(foundDirection)
  return foundDirection
}

const initialState = {
  cubeFaceClicked: null,
  initialCubeClicked: null,
  rubikCubeSide: null,
  finalCube: null,
  rotateAxis: null,
  direction: null
};

const reducer = (state, action) => {
  switch (action.type){
    case 'start_movement_point':
      return {cubeFaceClicked: action.cubeFaceClicked, initialCubeClicked: action.initialCubeClicked, rubikCubeSide: action.rubikCubeSide, finalCube: null}
    case 'trace_movement_destination':
      return {...state, finalCube: action.finalCube}
    case 'rotate_movement':
      return {...state, rotateAxis: action.rotateAxis, direction: action.direction}
    case 'auto_rotate':
      return {...state, initialCubeClicked: action.initialCubeClicked, rotateAxis: action.rotateAxis, direction: action.direction}
    case 'finish_movement':
      return {initialState}
    default:
      return null
  }
}

const useRotation = () => {
  const [
    {
      cubeFaceClicked,
      initialCubeClicked,
      rubikCubeSide,
      finalCube,
      rotateAxis,
      direction,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  
  const previousDragged = useRef()

  useEffect(()=> {
    //Logic to find rotation axis: cubeFaceClicked stores the face of the cube that has been clicked. 
    // axisDisplaced stores the axis that had the biggest displacement when dragging the cube. 
    // Using both values, search in the axisRotationCorrespondance table, to retrieve the axis to be rotated.
    if(initialCubeClicked && finalCube){
      let vectorDragged = {
        x: finalCube.x - initialCubeClicked.x,
        y: finalCube.y - initialCubeClicked.y,
        z: finalCube.z - initialCubeClicked.z,
      };
      
      const axisDisplaced = maxKey(vectorDragged);
      const axisRotationCorrespondance = {
        x: { y: "z", z: "y" },
        y: { x: "z", z: "x" },
        z: { x: "y", y: "x" },
      };
      if(Math.abs(vectorDragged[axisDisplaced]) > 0.2 ){ //0.2 is the minimum displacement on any axis required to start a movement
      //rotate the cubes using the calculated direction and rotating only the axis retrieved at the start of the movement 
      //TODO: axisDisplaced can change its value if the mouse pointer changes the direction while dragging, save and keep the initial value like rotateAxis
      
      dispatch({
        type: "rotate_movement",
        rotateAxis: rotateAxis ? rotateAxis : axisRotationCorrespondance[cubeFaceClicked][axisDisplaced],
        direction: findDirection(
          cubeFaceClicked ,
          rubikCubeSide,
          axisDisplaced,
          vectorDragged,
          previousDragged,
          direction
        ),
      });
      previousDragged.current = vectorDragged
      } 
    }
  },[finalCube])

  useEffect(()=> {
    if(!rotateAxis){
      previousDragged.current = null
    }
  },[rotateAxis])

  return [rotateAxis, initialCubeClicked, direction, dispatch]

}

export default useRotation