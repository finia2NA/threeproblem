import { Points } from "@react-three/drei";
import * as THREE from "three";

const PointCloud2 = (props) => {
  const positionsBuffer = new Float32Array(props.positions.length * 3);

  props.positions.forEach((position, index) => {
    positionsBuffer[index * 3 + 0] = position.x;
    positionsBuffer[index * 3 + 1] = position.y;
    positionsBuffer[index * 3 + 2] = position.z;
  });

  // fill the colors buffer with white
  const colorsBuffer = new Float32Array(props.positions.length * 3).fill(255);

  // fill the sizes buffer with 0.1
  const sizesBuffer = new Float32Array(props.positions.length).fill(0.01);

  const vertexShader = `
    attribute float size;
    attribute vec3 customColor;
    varying vec3 vColor;
    void main() {
      vColor = customColor;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    void main() {
      float dist = length(gl_PointCoord.xy - vec2(0.5));
      if (dist > 0.5) discard;
      gl_FragColor = vec4(vColor, 1.0);
    }
  `;

  const material = new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader,
    fragmentShader,
  });

  return (
    <Points
      positions={positionsBuffer}
      colors={colorsBuffer}
      sizes={sizesBuffer}
      material={material}
    />
  );
};

export default PointCloud2;