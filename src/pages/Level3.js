import { LEVEL3_TREE } from '../constants/Levels';
import { GeomStage } from '../components/GeomStage/GeomStage';

export function Level3() {
  return (
    <>
      <GeomStage initialTree={LEVEL3_TREE} />
    </>
  );
}
