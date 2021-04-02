import * as PIXI from "pixi.js";
import PixiFps from "pixi-fps";
import { install } from "@pixi/unsafe-eval";

import "@ecs/world";

// Apply the patch to PIXI
install(PIXI);

import { ants, hexToRGB } from "./data";

const app = new PIXI.Application({ backgroundColor: 0xf0f0f0 });

document.body.appendChild(app.view);

const triangleData = [-10, 0, 10, 0, 0, -24];

const geometry = new PIXI.Geometry().addAttribute("aVPos", triangleData);

geometry.instanced = true;
geometry.instanceCount = 5;

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

const antColor = hexToRGB("#364f6b", 1);
function getMassCenter(arr: number[]): number[] {
  let sum: number[] = [0, 0];
  for (let i = 0; i < arr.length / 2; i++) {
    sum[0] += arr[i * 2];
    sum[1] += arr[i * 2 + 1];
  }
  return [sum[0] / 3, sum[1] / 3];
}

const massCenter = getMassCenter(triangleData);

for (let i = 0; i < geometry.instanceCount; i++) {
  const instanceOffset = i * (positionSize + colorSize + centerSize);

  buffer.data[instanceOffset + 0] = ants[i].x;
  buffer.data[instanceOffset + 1] = ants[i].y;
  buffer.data[instanceOffset + 2] = ants[i].rot;
  buffer.data[instanceOffset + 3] = massCenter[0];
  buffer.data[instanceOffset + 4] = massCenter[1];
  buffer.data[instanceOffset + 5] = antColor.r;
  buffer.data[instanceOffset + 6] = antColor.g;
  buffer.data[instanceOffset + 7] = antColor.b;
  buffer.data[instanceOffset + 8] = antColor.a;
}

console.log(buffer.data);

const shader = PIXI.Shader.from(
  `
  precision mediump float;
  attribute vec2 aVPos;
  attribute vec3 aIPos;
  attribute vec2 aCPos;
  attribute vec4 aICol;

  uniform mat3 translationMatrix;
  uniform mat3 projectionMatrix;

  varying vec4 vCol;

  vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, s, -s, c);
    return m * v;
  }

  void main() {
    vCol = aICol;
    vec3 position = vec3((projectionMatrix * translationMatrix *  vec3(rotate(aVPos, aIPos.z) + aIPos.xy, 1.0)).xy, 1.0);

    gl_Position = vec4(( position ).xy, 0.0, 1.0);
  }
`,
  `
  precision mediump float;

  varying vec4 vCol;

  void main() {
    gl_FragColor = vCol;
  }
`
);

const triangles = new PIXI.Mesh(geometry, shader);

triangles.position.set(400, 300);

const fpsCounter = new PixiFps();

app.stage.addChild(fpsCounter);

app.stage.addChild(triangles);

app.ticker.add((delta: number) => {
  ants[2].rot += 0.1 * delta;
  for (let i = 0; i < geometry.instanceCount; i++) {
    const instanceOffset = i * (positionSize + colorSize + centerSize);

    buffer.data[instanceOffset + 0] = ants[i].x;
    buffer.data[instanceOffset + 1] = ants[i].y;
    buffer.data[instanceOffset + 2] = ants[i].rot;
  }
  buffer.update();
});
