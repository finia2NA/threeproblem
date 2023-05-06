import './App.css';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Point, Points, Stats } from '@react-three/drei';
import circleImg from './assets/circle.png';
import * as THREE from "three";
import { useEffect, useState } from 'react';

const PointCloud = props => {
  const vertexSize = 0.05;
  const CircleImg = useLoader(THREE.TextureLoader, circleImg);


  const onClick = (event, position) => {
    console.log(position)
  }

  return (
    <Points>
      <pointsMaterial attach={"material"}
        map={CircleImg}
        size={vertexSize}
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
        sizeAttenuation />

      {props.positions.map((pos, i) => {
        return <Point key={i} position={pos} onClick={e => onClick(e, pos)} />
      })}
    </Points >
  )
};


function App() {

  const [positions, setPositions] = useState([])

  useEffect(() => {
    const positions = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5);
      const y = (Math.random() - 0.5);
      const z = (Math.random() - 0.5);
      positions.push(new THREE.Vector3(x, y, z));
    }
    setPositions(positions);
  }, [])

  return (
    <>
      <Canvas camera={{ position: [0, 0, 2] }} style={{ background: "grey", width: "95vw", height: "95vh" }} >

        {/* points */}
        <PointCloud positions={positions} />

        {/* controls */}
        <OrbitControls />
        <Stats />

      </Canvas>
    </>
  );
}

export default App;
