import { LEVEL1_TREE } from '../constants/Levels';
import { GeomStage } from '../components/GeomStage/GeomStage';

export function Level1() {
  return (
    <>
      <GeomStage initialTree={LEVEL1_TREE} />
    </>
  );
}
