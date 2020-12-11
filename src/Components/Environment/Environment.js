import React, {useState, useLayoutEffect} from 'react'
import {useThree, useResource, useFrame , useLoader} from 'react-three-fiber'
import {BackSide, WebGLCubeRenderTarget, TextureLoader} from 'three'


const Environment = () => {
  const camera = useResource()
  const { scene, gl } = useThree()
  const [cubeRenderTarget] = useState(() => new WebGLCubeRenderTarget(256))
  
  const texture = useLoader(TextureLoader, 'Background/4.jpg')
  useFrame(() => camera.current.update(gl, scene))

  //There are 2 planes, the first one, creates a mirroring effect the second is the actual ground
  return (
    <>
    <cubeCamera ref={camera} args={[1, 1000, cubeRenderTarget]} position={[0,-7,0]}/>
    <mesh visible position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[1024, 1024]} attach="geometry"/>
      <meshBasicMaterial envMap={cubeRenderTarget.texture} opacity={0.25} transparent/>
    </mesh>
    
    <mesh visible position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]} >
      <planeBufferGeometry args={[512, 512]} attach="geometry"/>
      <meshBasicMaterial
        metalness={0.4}
        map={texture}
      />
    </mesh>

    </>
  );
};

export default Environment
