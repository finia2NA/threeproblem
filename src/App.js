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
    if (event.distanceToRay < vertexSize / 2) {
      console.log(event, position)
      props.onClick(position);
    }
  }

  return (
    <Points>
      <pointsMaterial attach={"material"}
        map={CircleImg}
        size={vertexSize}
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
        sizeAttenuation
        color={props.color}
      />

      {props.positions.map((pos, i) => {
        return <Point key={i} position={pos} onClick={e => onClick(e, pos)} />
      })}
    </Points >
  )
};


function App() {

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const positions = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5);
      const y = (Math.random() - 0.5);
      const z = (Math.random() - 0.5);

      const myVector = new THREE.Vector3(x, y, z);
      myVector.zug = "white"
      positions.push(myVector);
    }
    setPositions(positions);
  }, [])

  const onClick = (position) => {
    const newPositions = [...positions];
    const index = newPositions.findIndex(p => p === position);
    newPositions[index].zug = newPositions[index].zug === "white" ? "red" : "white";
    setPositions(newPositions);
  }

  return (
    <>
      <Canvas camera={{ position: [0, 0, 2] }} style={{ background: "grey", width: "95vw", height: "95vh" }} >

        {/* points */}
        <PointCloud positions={positions.filter(p => p.zug === "white")} color={"white"} onClick={onClick} />
        <PointCloud positions={positions.filter(p => p.zug === "red")} color={"red"} onClick={onClick} />

        {/* controls */}
        <OrbitControls />
        <Stats />

      </Canvas>
    </>
  );
}

export default App;
