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
