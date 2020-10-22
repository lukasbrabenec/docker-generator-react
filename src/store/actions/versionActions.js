import axios from "axios";

export const initVersions = () => {
  return (dispatch) => {
    axios.get('http://localhost/api/v1/versions')
      .then(res => {
        dispatch({ type: 'INIT_VERSIONS_SUCCESS', versions: res.data.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'INIT_VERSIONS_ERROR', err });
      });
  }
};