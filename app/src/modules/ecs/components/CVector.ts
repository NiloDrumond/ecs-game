import APE from 'ape-ecs';

export default class CVector extends APE.Component {
  static type = 'CVector';
  static properties = {
    speed: 0,
    angle: 0,
    distance: 0,
    maxDistance: 0,
    mangle: 0,
  };
}
