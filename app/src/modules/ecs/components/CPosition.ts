import APE from "ape-ecs";

export default class CPosition extends APE.Component {
  static type = "CPosition";
  static properties = {
    x: 0,
    y: 0,
    angle: 0,
  };
}
