import React, {forwardRef, useEffect, useRef, useState} from 'react'
import {useLoader} from 'react-three-fiber'
import { BackSide, TextureLoader } from 'three'




const Cube = forwardRef(({position}, ref) => {

    const textures = useLoader(TextureLoader, 
      [
      './Background/orangeTexture.png',
      './Background/redTexture.png',
      './Background/whiteTexture.png',
      './Background/yellowTexture.png',
      './Background/greenTexture.png', 
      './Background/blueTexture.png'
    ])
    const mesh = useRef()
    const materials = []
    const [faces] = useState([ //Face textures depending on position
        position.x === 1 ? textures[0] : null, 
        position.x === -1 ? textures[1] : null, 
        position.y === 1 ? textures[2] : null, 
        position.y === -1 ? textures[3] : null, 
        position.z === 1 ? textures[4] : null, 
        position.z === -1 ? textures[5] : null
    ])

    materials.push(faces.map((f, i)=> {
      return (
        <meshStandardMaterial
          attachArray="material"
          map={f}
          color={f ? null : 'black'}
          metalness={0}
          roughness={0}
          clearcoat={1}
          reflectivity={1}
        />
      );
    }))
    
    
    return (
      <group ref={ref} position={Object.values(position)} >
        <mesh ref={mesh}>
          <boxBufferGeometry args={[1, 1, 1]}/>
          {materials}
        </mesh>
      </group>
    );
}
)

export default Cube