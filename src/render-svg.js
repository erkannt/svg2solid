import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const stokeMaterial = new THREE.LineBasicMaterial({
  color: '#adb5bd',
});

export const renderSVG = (svg) => {
  const defaultExtrusion = 1;
  const loader = new SVGLoader();
  const svgData = loader.parse(svg);
  const svgGroup = new THREE.Group();
  const updateMap = [];
  const byColor = new Map();

  svgGroup.scale.y *= -1;
  svgData.paths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);

    shapes.forEach((shape) => {
      const meshGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: defaultExtrusion,
        bevelEnabled: false,
      });
      const linesGeometry = new THREE.EdgesGeometry(meshGeometry);
      const fillMaterial = new THREE.MeshBasicMaterial({ color: path.color });
      const mesh = new THREE.Mesh(meshGeometry, fillMaterial);
      const lines = new THREE.LineSegments(linesGeometry, stokeMaterial);

      const colorHex = path.color.getHexString();
      if (!byColor.has(colorHex)) {
        byColor.set(colorHex, [{ mesh, shape, lines, depth1: 0, depth2: defaultExtrusion }]);
      } else {
        byColor.get(colorHex).push({ mesh, shape, lines, depth1: 0, depth2: defaultExtrusion });
      }

      updateMap.push({ shape, mesh, lines });
      svgGroup.add(mesh, lines);
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
    byColor,
    update(extrusion_from, extrusion_to, dual, colorHex) {
      console.log('>>>', colorHex, extrusion_from, extrusion_to);
      const toUpdate = byColor.get(colorHex);
      console.log('>>>', toUpdate);

      const depth1 = Math.min(extrusion_from, extrusion_to);
      const depth2 = Math.max(extrusion_from, extrusion_to);

      toUpdate.forEach((updateDetails) => {

        updateDetails.depth1 = depth1;
        updateDetails.depth2 = depth2;

        const meshGeometry = new THREE.ExtrudeGeometry(updateDetails.shape, {
          depth: dual ? depth2 - depth1 : depth2,
          bevelEnabled: false,
        });
        const linesGeometry = new THREE.EdgesGeometry(meshGeometry);

        updateDetails.mesh.position.z = dual ? depth1 : 0;
        updateDetails.lines.position.z = dual ? depth1 : 0;

        updateDetails.mesh.geometry.dispose();
        updateDetails.lines.geometry.dispose();
        updateDetails.mesh.geometry = meshGeometry;
        updateDetails.lines.geometry = linesGeometry;
      });
    },
  };
};
