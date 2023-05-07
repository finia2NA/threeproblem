import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import * as THREE from "three";
import { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { PointCloud } from './PointCloud';
// https://discourse.threejs.org/t/merge-multiple-mesh-into-a-single-one/35971/5

const generateLine = false;

function App() {
  const [raycaster, setRaycaster] = useState(null);
  const [scene, setScene] = useState(null);

  const orbitControls = useRef();
  const camera = useRef();

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const positions = [];
    for (let i = 0; i < 100; i++) {
      let x, y, z;
      if (generateLine) {
        x = 0;
        y = 0;
        z = i * 1.0 / 10;
      } else {
        x = (Math.random() - 0.5);
        y = (Math.random() - 0.5);
        z = (Math.random() - 0.5);
      }
      const myVector = new THREE.Vector3(x, y, z);
      myVector.zug = "white"
      positions.push(myVector);
    }
    setPositions(positions);
  }, [])

  const onPointCloudClick = (position) => {
    const newPositions = [...positions];
    console.log(position, positions)
    const index = newPositions.findIndex(p => p.distanceTo(position) < 0.001 && p);
    newPositions[index].zug = newPositions[index].zug === "white" ? "red" : "white";
    setPositions(newPositions);
  }

  const testFunction = () => { }

  return (
    <>
      <Canvas camera={{ position: [0, 0, 2], ref: camera }} style={{ background: "grey", width: "95vw", height: "95vh" }}>



        {/* points */}
        < PointCloud positions={positions.filter(p => p.zug === "white")} color={"white"} onClick={onPointCloudClick} />
        <PointCloud positions={positions.filter(p => p.zug === "red")} color={"red"} onClick={onPointCloudClick} />

        {/* controls */}
        <OrbitControls />
        <Stats />

      </Canvas >
      <Button variant="contained" color="primary" onClick={testFunction}> Test </Button>
    </>
  );
}

export default App;
