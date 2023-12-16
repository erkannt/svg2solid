import { renderSVG } from './render-svg';
import { setupScene } from './setup-scene';
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const svg = `<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" height="100%" style="fill-rule:nonzero;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;" xml:space="preserve" width="100%" version="1.1" viewBox="0 0 24 24">
<defs/>
<g id="Untitled">
<path d="M7.15256e-07+7.15256e-07L24+7.15256e-07L24+24L7.15256e-07+24L7.15256e-07+7.15256e-07M6.30667+20.0533C6.84+21.1867+7.89333+22.12+9.69333+22.12C11.6933+22.12+13.0667+21.0533+13.0667+18.72L13.0667+11.0133L10.8+11.0133L10.8+18.6667C10.8+19.8133+10.3333+20.1067+9.6+20.1067C8.82667+20.1067+8.50667+19.5733+8.14667+18.9467L6.30667+20.0533M14.28+19.8133C14.9467+21.12+16.2933+22.12+18.4+22.12C20.5333+22.12+22.1333+21.0133+22.1333+18.9733C22.1333+17.0933+21.0533+16.2533+19.1333+15.4267L18.5733+15.1867C17.6+14.7733+17.1867+14.4933+17.1867+13.8267C17.1867+13.28+17.6+12.8533+18.2667+12.8533C18.9067+12.8533+19.3333+13.1333+19.72+13.8267L21.4667+12.6667C20.7333+11.3867+19.6933+10.8933+18.2667+10.8933C16.2533+10.8933+14.96+12.1733+14.96+13.8667C14.96+15.7067+16.04+16.5733+17.6667+17.2667L18.2267+17.5067C19.2667+17.96+19.88+18.24+19.88+19.0133C19.88+19.6533+19.28+20.12+18.3467+20.12C17.24+20.12+16.6+19.5467+16.12+18.7467L14.28+19.8133Z" opacity="1" fill="#000000"/>
</g>
</svg>`;

const defaultExtrusion = 1;
const sceneContainer = document.querySelector('#sceneContainer');
const extrusionInput = document.querySelector('#extrusionDepth');
const svgFileInput = document.querySelector('#svgFile');
const downloadButton = document.querySelector('#download');

const { scene } = setupScene(sceneContainer);
const { object, update, byColor } = renderSVG(defaultExtrusion, svg);

var state = {
  scene,
  byColor,
  sceneUpdate: update,
};
state.scene.add(object);

svgFileInput.addEventListener('change', function (event) {
  var reader = new FileReader();
  reader.onload = function (event) {
    var svgData = event.target.result;
    const { object, update, byColor } = renderSVG(defaultExtrusion, svgData);
    while (state.scene.children.length > 0) {
      state.scene.remove(scene.children[0]);
    }
    state.scene.add(object);
    state.sceneUpdate = update;
    state.byColor = byColor;
  };
  reader.readAsText(event.target.files[0]);
});

extrusionInput.addEventListener('input', () => {
  state.sceneUpdate(Number(extrusionInput.value));
});
extrusionInput.value = defaultExtrusion;

downloadButton.addEventListener('click', () => {
  const exporter = new STLExporter();
  const zip = new JSZip();
  for (const [color, colorShapeData] of state.byColor) {
    const scene = new THREE.Scene();
    colorShapeData.forEach((data) => {
      scene.add(data.mesh);
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
});
