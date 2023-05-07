import { useLoader } from '@react-three/fiber';
import { Point, Points } from '@react-three/drei';
import circleImg from './assets/circle.png';
import * as THREE from "three";
import { useMemo } from 'react';

export const PointCloud = props => {
  const pointsPerSlice = 10;
  const vertexSize = 0.05;
  const CircleImg = useLoader(THREE.TextureLoader, circleImg);

  const onClick = (event) => {

    // guard against ray not hitting point
    if (event.distanceToRay > vertexSize / 2) return

    event.stopPropagation()
    const eventArray = event.object.geometry.attributes.position.array
    const pointPosition = new THREE.Vector3(eventArray[event.index * 3], eventArray[event.index * 3 + 1], eventArray[event.index * 3 + 2])

    props.onClick(pointPosition)
  }



  const slices = []
  for (let i = 0; i < props.positions.length; i += pointsPerSlice) {
    slices.push(props.positions.slice(i, i + pointsPerSlice))
  }

  console.log("#slices:", slices.length)

  return (
    <>
      {slices.map((slice, sliceIndex) =>
        <Points key={sliceIndex}>
          <pointsMaterial attach={"material"}
            map={CircleImg}
            size={vertexSize}
            transparent={false}
            alphaTest={0.5}
            opacity={1.0}
            sizeAttenuation
            color={props.color} />
          {slice.map((pos, i) => {
            return <Point key={i} position={pos} onClick={onClick} />;
          })}
        </Points>
      )}
    </>
  );
};
