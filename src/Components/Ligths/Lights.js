import React from 'react'

const Lights = () => {
  return (
    <group>
      <hemisphereLight skyColor={'#ffffff'} groundColor={'#ffffff'} intensity={.7} />
      {/* <spotLight intensity={.5} castShadow position={[0, 100, 0]} angle={0.15} penumbra={1} /> */}
      {/* <pointLight intensity={1.5} color={'#fb2a92'} castShadow position={[0, 1, -10]} /> */}
      {/* <directionalLight intensity={2} color={'#fb2a92'} position={[0,10,-10]} /> */}
      {/* <rectAreaLight intensity={2} color={'#fb2a92'} position={[0,10,0]} width={400} height={400} rotation={[-Math.PI / 2, 0, 0]}/> */}
    </group>

  )
}

export default Lights