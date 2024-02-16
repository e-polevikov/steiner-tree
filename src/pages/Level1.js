import { LEVEL1_SETTINGS } from '../constants/Levels';
import { GeomStage } from '../components/GeomStage/GeomStage';

export function Level1() {
  return (
    <>
      <GeomStage settings={LEVEL1_SETTINGS} />
    </>
  );
}
