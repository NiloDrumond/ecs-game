export default interface IGame {
  type: 'Game';
  width: number;
  height: number;
  layers: {
    main: this;
  };
}
