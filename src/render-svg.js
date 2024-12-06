import * as THREE from 'three';
import { Color } from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const BASE_COLOR = '#ffffff';

const stokeMaterial = new THREE.LineBasicMaterial({
  color: '#adb5bd',
});

const containsColor = (paths, color) => {
  let result = false;
  for (const path of paths) {
    if (path.color.getHexString() === color.getHexString()) {
      result = true;
      break;
    }
  }

  return result;
};

export const renderSVG = (svg) => {
  const loader = new SVGLoader();
  const svgData = loader.parse(svg);
  const svgGroup = new THREE.Group();
  const updateMap = [];
  const byColor = new Map();

  let baseColor = new Color(BASE_COLOR);
  while (containsColor(svgData.paths, baseColor)) {
    baseColor.b -= 0.01;
  }

  const createGeometryFromShape = (shape, color, zOffset, depth) => {
    const meshGeometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: false,
    });
    meshGeometry.translate(0, 0, zOffset);
    const linesGeometry = new THREE.EdgesGeometry(meshGeometry);
    const fillMaterial = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(meshGeometry, fillMaterial);
    const lines = new THREE.LineSegments(linesGeometry, stokeMaterial);

    const colorHex = color.getHexString();
    const isBase = colorHex === baseColor.getHexString();
    if (!byColor.has(colorHex)) {
      byColor.set(colorHex, [{ mesh, shape, lines, depth, isBase }]);
    } else {
      byColor.get(colorHex).push({ mesh, shape, lines, depth, isBase });
    }

    updateMap.push({ shape, mesh, lines });
    svgGroup.add(mesh, lines);
  };

  svgGroup.scale.y *= -1;
  svgData.paths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);

    shapes.forEach((shape) => {
      createGeometryFromShape(shape, baseColor, 0, 0.9);
      createGeometryFromShape(shape, path.color, 1, 0.1);
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
    update(extrusion, colorHex) {
      console.log('>>>', colorHex, extrusion);
      const toUpdate = byColor.get(colorHex);
      console.log('>>>', toUpdate);
      toUpdate.forEach((updateDetails) => {
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
