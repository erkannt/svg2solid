import { renderSVG } from './render-svg';
import { exampleSvgData } from './example-svg';
import { setupScene } from './setup-scene';
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const App = (() => {
  const { scene, camera, controls } = setupScene(document.querySelector('#sceneContainer'));
  var state = {
    scene,
    camera,
    controls,
  };

  const fitCamera = () => {
    const boundingBox = new THREE.Box3().setFromObject(state.extrusions);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());
    const offset = 0.5;
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2)) * offset;
    const minZ = boundingBox.min.z;
    const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

    state.controls.target = center;
    state.controls.maxDistance = cameraToFarEdge * 2;
    state.controls.minDistance = cameraToFarEdge * 0.5;
    state.controls.saveState();
    state.camera.position.z = cameraZ;
    state.camera.far = cameraToFarEdge * 3;
    state.camera.updateProjectionMatrix();
  };

  const loadSvg = (svgData) => {
    const { object, update, byColor } = renderSVG(svgData);
    while (state.scene.children.length > 0) {
      state.scene.remove(state.scene.children[0]);
    }
    state.extrusions = object;
    state.scene.add(object);
    state.sceneUpdate = update;
    state.byColor = byColor;
  };

  const renderDepthInputs = () => {
    const depthsContainer = document.querySelector('#depths');
    depthsContainer.innerHTML = '';
    for (const [color, colorShapeData] of state.byColor) {
      const item = document.createElement('li');
      const label = document.createElement('label');
      const swatch = document.createElement('span');
      const input = document.createElement('input');
      label.innerHTML = color;
      label.setAttribute('for', color);
      swatch.setAttribute('style', `background-color: #${color}`);
      input.setAttribute('type', 'number');
      input.setAttribute('step', '0.1');
      input.setAttribute('id', color);
      input.value = colorShapeData[0].depth;
      input.addEventListener('input', (event) => {
        state.sceneUpdate(Number(event.currentTarget.value), color);
      });

      item.appendChild(label);
      item.appendChild(swatch);
      item.appendChild(input);
      depthsContainer.appendChild(item);
    }
  };

  const download = () => {
    const exporter = new STLExporter();
    const zip = new JSZip();
    for (const [color, colorShapeData] of state.byColor) {
      const scene = new THREE.Scene();
      colorShapeData.forEach((data) => {
        scene.add(data.mesh.clone());
      });
      const result = exporter.parse(scene, { binary: false });
      zip.file(`${color}.stl`, result);
    }
    zip
      .generateAsync({
        type: 'blob',
      })
      .then(function (content) {
        saveAs(content, 'svg2solid.zip');
      });
  };

  return {
    loadSvg,
    fitCamera,
    renderDepthInputs,
    download,
  };
})();

App.loadSvg(exampleSvgData);
App.renderDepthInputs();
App.fitCamera();

const svgFileInput = document.querySelector('#svgFile');
const downloadButton = document.querySelector('#download');

svgFileInput.addEventListener('change', function (event) {
  var reader = new FileReader();
  reader.onload = function (event) {
    App.loadSvg(event.target.result);
    App.renderDepthInputs();
    App.fitCamera();
  };
  reader.readAsText(event.target.files[0]);
});

downloadButton.addEventListener('click', () => {
  App.download();
});
