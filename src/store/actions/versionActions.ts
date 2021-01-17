import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export const initVersions = (): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    axios
      .get('http://localhost:8080/api/v1/versions')
      .then((res) => {
        dispatch({ type: 'INIT_VERSIONS_SUCCESS', versions: res.data.data });
      })
      .catch((err) => {
        dispatch({ type: 'INIT_VERSIONS_ERROR', err });
      });
  };
};
