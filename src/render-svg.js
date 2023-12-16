import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const stokeMaterial = new THREE.LineBasicMaterial({
  color: '#00A5E6',
});

export const renderSVG = (extrusion, svg) => {
  const loader = new SVGLoader();
  const svgData = loader.parse(svg);
  const svgGroup = new THREE.Group();
  const updateMap = [];

  svgGroup.scale.y *= -1;
  svgData.paths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);

    shapes.forEach((shape) => {
      const meshGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: extrusion,
        bevelEnabled: false,
      });
      const linesGeometry = new THREE.EdgesGeometry(meshGeometry);
      const fillMaterial = new THREE.MeshBasicMaterial({ color: path.color });
      const mesh = new THREE.Mesh(meshGeometry, fillMaterial);
      const lines = new THREE.LineSegments(linesGeometry, stokeMaterial);

      updateMap.push({ shape, mesh, lines });
      svgGroup.add(mesh);
    });
  });

  const box = new THREE.Box3().setFromObject(svgGroup);
  const size = box.getSize(new THREE.Vector3());
  const yOffset = size.y / -2;
  const xOffset = size.x / -2;

  svgGroup.children.forEach((item) => {
    item.position.x = xOffset;
    item.position.y = yOffset;
  });
  svgGroup.rotateX(-Math.PI / 2);

  return {
    object: svgGroup,
    update(extrusion) {
      updateMap.forEach((updateDetails) => {
        const meshGeometry = new THREE.ExtrudeGeometry(updateDetails.shape, {
          depth: extrusion,
          bevelEnabled: false,
        });
        const linesGeometry = new THREE.EdgesGeometry(meshGeometry);

        updateDetails.mesh.geometry.dispose();
        updateDetails.lines.geometry.dispose();
        updateDetails.mesh.geometry = meshGeometry;
        updateDetails.lines.geometry = linesGeometry;
      });
    },
  };
};
