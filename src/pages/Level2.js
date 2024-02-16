import { LEVEL2_TREE } from '../constants/Levels';
import { GeomStage } from '../components/GeomStage/GeomStage';

export function Level2() {
  return (
    <>
      <GeomStage initialTree={LEVEL2_TREE} />
    </>
  );
}
