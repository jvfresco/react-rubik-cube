import React, { useEffect, useRef, useState, Suspense }from 'react';
import RubikCube from './Components/RubikCube/RubikCube'
import * as THREE from 'three'
import Ligths from './Components/Ligths/Lights'
import World from './Components/World/World'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber'
import './App.css';
import Environment from './Components/Environment/Environment';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {Loader} from 'drei'

extend({ OrbitControls })

const CameraControls = ({rotate}) => {
  const {camera, gl:{domElement}} = useThree()
  const controls = useRef()
  
  useFrame(() => {
    controls.current.update()
  })


  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      enableRotate={rotate}
      enableDamping={true}
      dampingFactor={0.05}
      maxDistance={12}
      minDistance={6}
      enablePan={false}
    />
  );
}

function App() {

  const [clickOnCube, setClickOnCube] = useState(false)
  const shuffleRef = useRef()
  const undoRef = useRef()
  const redoRef = useRef()
  const solveRef = useRef()

  const handleClickCube = (value) => {
    setClickOnCube(value)
  }
  
  return (
    <>
      <div className={'Menu'}>
        <button onClick={() => shuffleRef && shuffleRef.current()}>
          Shuffle
        </button>
        <button onClick={() => undoRef && undoRef.current()}>
          Undo
        </button>
        <button onClick={() => redoRef && redoRef.current()}>
          Redo
        </button>
        <button onClick={() => solveRef && solveRef.current()}>
          Solve
        </button>
      </div>
      <Canvas className={Canvas} shadowMap camera={{ position: [7, 3, 7] }}>
        {/* <axesHelper args={[4,4,4]}/> */}
        {/* <fog attach="fog" args={['#1a033d', 5, 50]} />  */}
        <CameraControls rotate={!clickOnCube} /> 
        <Suspense fallback={null}>
          <RubikCube
            onShuffle={(callback) => (shuffleRef.current = callback)}
            onUndo={(callback) => (undoRef.current = callback)}
            onRedo={(callback) => (redoRef.current = callback)}
            onSolve={(callback) => (solveRef.current = callback)}
            blockRubikCubeRotation={handleClickCube}
          />
          <Environment />
          <World />
        </Suspense>
        <Ligths />
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
