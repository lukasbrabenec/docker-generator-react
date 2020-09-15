import axios from "axios";

export const updateImageVersion = (newImageVersionId, previousImageVersionId) => {
  return (dispatch) => {
    dispatch({type: 'UPDATE_IMAGE_VERSION', newImageVersionId, previousImageVersionId});
  }
}

export const removeImageVersion = imageVersionId => {
  return (dispatch) => {
    dispatch({type: 'REMOVE_IMAGE_VERSION', imageVersionId});
  }
}

export const changeExtensions = (imageVersionId, extensions) => {
  return (dispatch) => {
    dispatch({type: 'CHANGE_EXTENSIONS', imageVersionId, extensions});
  }
}

export const changeEnvironments = (imageVersionId, environments) => {
  return (dispatch) => {
    dispatch({type: 'CHANGE_ENVIRONMENTS', imageVersionId, environments});
  }
}

export const changePorts = (imageVersionId, ports) => {
  return (dispatch) => {
    dispatch({type: 'CHANGE_PORTS', imageVersionId, ports});
  }
}

export const generate = () => {
  return (dispatch, getState) => {
    const request = {
      request: getState().generate
    }
    axios.post('http://localhost/api/v1/generate', request, {responseType: 'blob'})
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.zip'); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {
        console.log(err);
      });
  }
}