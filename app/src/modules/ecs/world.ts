import APE from 'ape-ecs';

import { CPosition, CVector } from './components';

import IPosition from './interfaces/components/IPosition';

const world = new APE.World({
  trackChanges: true,
  entityPool: 100,
  cleanupPools: true,
  // useApeDestroy: true
});

world.registerTags('Agent');

world.registerComponent(CPosition, 100);
world.registerComponent(CVector, 100);

for (let i = 0; i < 50; i++) {
  const positionC: IPosition = {
    type: 'CPosition',
    x: Math.random() * 30,
    y: Math.random() * 30,
    angle: Math.PI,
  };

  const e = world.createEntity({
    tags: ['Agent'],
    components: [positionC],
  });
}

const ents = world.getEntities('Agent');

console.log(ents);
