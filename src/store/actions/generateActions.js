import axios from "axios";

export const changeDockerVersion = (versionId) => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_DOCKER_VERSION', versionId });
  }
};

export const updateImageVersionInRequest = (newImageVersionId, previousImageVersionId) => {
  return (dispatch) => {
    dispatch({type: 'UPDATE_IMAGE_VERSION', newImageVersionId, previousImageVersionId});
  }
}

export const removeImageVersionInRequest = imageVersionId => {
  return (dispatch) => {
    dispatch({type: 'REMOVE_IMAGE_VERSION', imageVersionId});
  }
}

export const changeExtensionsInRequest = (imageVersionId, extensions) => {
  return (dispatch) => {
    dispatch({type: 'CHANGE_EXTENSIONS', imageVersionId, extensions});
  }
}

export const changeEnvironmentsInRequest = (imageVersionId, environments) => {
  return (dispatch) => {
    dispatch({type: 'CHANGE_ENVIRONMENTS', imageVersionId, environments});
  }
}

export const changePortsInRequest = (imageVersionId, ports) => {
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