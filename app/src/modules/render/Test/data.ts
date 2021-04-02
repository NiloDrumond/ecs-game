interface PositionComponent {
  x: number;
  y: number;
  rot: number;
}

export const ants: PositionComponent[] = [
  { x: 0, y: 0, rot: 1 * Math.PI },
  { x: 20, y: 20, rot: 1.2 * Math.PI },
  { x: 40, y: 40, rot: 0.5 },
  { x: 60, y: 60, rot: 180 },
  { x: 80, y: 80, rot: 1.5 },
];

export function hexToRGB(hex: string, a: number) {
  return {
    r: parseInt(hex.slice(1, 3), 16) / 256,
    g: parseInt(hex.slice(3, 5), 16) / 256,
    b: parseInt(hex.slice(5, 7), 16) / 256,
    a,
  };
}
