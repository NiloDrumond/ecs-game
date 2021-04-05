import APE from 'ape-ecs';

import { renderAnts } from '@render/sprites/ants';
import { srandom } from '@utils/math';
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
    x: srandom() * 200,
    y: srandom() * 200,
    angle: srandom() * Math.PI,
  };

  const e = world.createEntity({
    tags: ['Agent'],
    components: [positionC],
  });
}

const ents = world.getEntities('Agent');
const arr = Array.from(ents);
const positions: IPosition[] = [];
for (let i = 0; i < arr.length; i++) {
  const component = arr[i].getOne('CPosition');
  if (component) {
    positions.push(component.getObject() as IPosition);
  }
}

renderAnts(positions);

export default world;
