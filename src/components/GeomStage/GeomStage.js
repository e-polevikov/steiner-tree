import { Stage, Layer } from 'react-konva';

import { STAGE_WIDTH, STAGE_HEIGHT, GRID_INDENT } from '../../constants/GeomStage';
import { StageGrid } from '../StageGrid/StageGrid';

import styles from './GeomStage.module.css';

export function GeomStage() {
  return (
    <div className={styles['geom-stage']}>
      <div className={styles['stage']}>
        <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
          <Layer>
            <StageGrid
              stageWidth={STAGE_WIDTH}
              stageHeight={STAGE_HEIGHT}
              gridIndent={GRID_INDENT}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
