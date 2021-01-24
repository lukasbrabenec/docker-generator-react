import { GenerateState } from '../request/requestTypes';
import { ImagesState } from '../image/imageTypes';
import { VersionState } from '../version/versionTypes';

export interface RootState {
  generate: GenerateState;
  image: ImagesState;
  version: VersionState;
}
