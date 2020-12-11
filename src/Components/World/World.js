import React, {useState, useLayoutEffect} from 'react'
import {useThree, useResource, useFrame , useLoader} from 'react-three-fiber'
import {BackSide, WebGLCubeRenderTarget, CubeTextureLoader} from 'three'
import * as THREE from 'three'

export default function World() {
  const { scene, gl } = useThree()
  const [texture] = useLoader(CubeTextureLoader, [["Background/1.jpg","Background/2.jpg","Background/3.jpg","Background/4.jpg","Background/5.jpg","Background/6.jpg"]])
  useLayoutEffect(() => {
    texture.encoding = THREE.sRGBEncoding
    const oldBg = scene.background
    const oldEnv = scene.environment
    scene.background = texture
    scene.environment = texture
    // Clean up on unmount
    return () => {
      scene.background = oldBg
      scene.environment = oldEnv
      texture.dispose()
    }
  }, [scene, texture])
  return null
}

