import axios from "axios";

export const initImages = () => {
  return (dispatch, getState) => {
    axios.get('http://localhost/api/v1/images')
      .then(res => {
        dispatch({ type: 'INIT_IMAGES_SUCCESS', images: res.data.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'INIT_IMAGES_ERROR', err });
      });
  }
};