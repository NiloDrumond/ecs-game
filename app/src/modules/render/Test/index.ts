import * as PIXI from "pixi.js";
import { install } from "@pixi/unsafe-eval";

import { ants, hexToRGB } from "./data";
// Apply the patch to PIXI
install(PIXI);

const app = new PIXI.Application();

document.body.appendChild(app.view);

const triangleData = [-5, 0, 5, 0, 0, -12];

const geometry = new PIXI.Geometry().addAttribute("aVPos", triangleData);

geometry.instanced = true;
geometry.instanceCount = ants.length;

const positionSize = 3;
const centerSize = 2;
const colorSize = 4;
const buffer = new PIXI.Buffer(
  new Float32Array(
    geometry.instanceCount * (positionSize + colorSize + centerSize)
  )
);

geometry.addAttribute(
  "aIPos",
  buffer,
  positionSize,
  false,
  PIXI.TYPES.FLOAT,
  4 * (positionSize + colorSize + centerSize),
  0,
  true
);

geometry.addAttribute(
  "aCPos",
  buffer,
  centerSize,
  false,
  PIXI.TYPES.FLOAT,
  4 * (positionSize + colorSize + centerSize),
  4 * positionSize,
  true
);

geometry.addAttribute(
  "aICol",
  buffer,
  colorSize,
  false,
  PIXI.TYPES.FLOAT,
  4 * (positionSize + colorSize + centerSize),
  4 * (positionSize + centerSize),
  true
);

const antColor = hexToRGB("#ba53de", 1);

function getMassCenter(arr: number[]): number[] {
  let sum: number[] = [0, 0];
  for (let i = 0; arr.length; i++) {
    sum[0] += arr[i * 2];
    sum[1] += arr[i * 2 + 1];
  }
  return [sum[0] / 3, sum[1] / 3];
}

const massCenter = getMassCenter(triangleData);
for (let i = 0; i < geometry.instanceCount; i++) {
  const instanceOffset = i * (positionSize + colorSize);

  buffer.data[instanceOffset + 1] = ants[i].x;
  buffer.data[instanceOffset + 2] = ants[i].y;
  buffer.data[instanceOffset + 3] = ants[i].rot;
  buffer.data[instanceOffset + 4] = massCenter[0];
  buffer.data[instanceOffset + 5] = massCenter[1];
  buffer.data[instanceOffset + 6] = antColor.r / 256;
  buffer.data[instanceOffset + 7] = antColor.g / 256;
  buffer.data[instanceOffset + 8] = antColor.b / 256;
  buffer.data[instanceOffset + 9] = antColor.a / 256;
}

console.log(buffer.data);

const shader = PIXI.Shader.from(
  `
  precision mediump float;
  attribute vec2 aVPos;
  attribute vec2 aIPos;
  attribute vec2 aCPos;
  attribute vec4 aICol;

  uniform mat3 translationMatrix;
  uniform mat3 projectionMatrix;

  varying vec4 vCol;
  //varying mat3 rotMatrix;


  void main() {
    vCol = aICol;
    //rotMatrix[0] = vec3(cos(aIPos.z), sin(aIPos.z), 0.0);
    //rotMatrix[1] = vec3(-sin(aIPos.z), cos(aIPos.z), 0.0);
    //rotMatrix[2][0] = aCPos.x - aCPos.x * cos(aIPos.z) + aCPos.y * sin(aIPos.z);
    //rotMatrix[2][1] = aCPos.y - aCPos.y * cos(aIPos.z) + aCPos.x * sin(aIPos.z);
    //rotMatrix[2][2] = 1.0;


    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVPos + aIPos, 1.0)).xy, 0.0, 1.0);
}`,
  `precision mediump float;

  varying vec4 vCol;

  void main() {
  gl_FragColor = vCol;
}
`
);

const triangles = new PIXI.Mesh(geometry, shader);

triangles.position.set(400, 300);

app.stage.addChild(triangles);

app.ticker.add((delta: number) => {
  triangles.rotation += 0.0;
});
