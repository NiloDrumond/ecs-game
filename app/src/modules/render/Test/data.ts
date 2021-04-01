interface PositionComponent {
  x: number;
  y: number;
  rot: number;
}

export const ants: PositionComponent[] = [
  { x: 0, y: 0, rot: 0 },
  { x: 30, y: 30, rot: 1 },
  { x: 70, y: 10, rot: 0.5 },
  { x: 20, y: 40, rot: 180 },
  { x: 80, y: 0, rot: 1.5 },
];

export function hexToRGB(hex: string, a: number) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
    a,
  };
}
