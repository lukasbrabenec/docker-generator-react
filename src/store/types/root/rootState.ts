import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RequestState } from '../request/requestTypes';
import { ImagesState } from '../image/imageTypes';
import { VersionState } from '../version/versionTypes';

export interface RootState {
  request: RequestState;
  image: ImagesState;
  version: VersionState;
}

export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppThunkDispatch<State = {}> = ThunkDispatch<
  State,
  void,
  Action<string>
>;
