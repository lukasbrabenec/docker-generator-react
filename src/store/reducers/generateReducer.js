const initState = {
  dockerVersion: 3.8,
  imageVersions: [],
}

const generateReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_IMAGE_VERSION':
      // remove previous image version
      const imageVersions = action.previousImageVersionId
        ? state.imageVersions.filter(imageVersion => imageVersion.imageVersionId !== action.previousImageVersionId)
        : state.imageVersions;
      return {
        ...state,
        imageVersions: [
          ...imageVersions,
          { imageVersionId: action.newImageVersionId }
        ]
      }
    case 'REMOVE_IMAGE_VERSION': {
      return {
        ...state,
        imageVersions: [
          ...state.imageVersions.filter(imageVersion => imageVersion.imageVersionId !== action.imageVersionId)
        ]
      }
    }
    case 'CHANGE_EXTENSIONS': {
      const currentImageVersion = state.imageVersions.find(imageVersion => imageVersion.imageVersionId === action.imageVersionId);
      const otherImageVersions = state.imageVersions.filter(imageVersion => imageVersion.imageVersionId !== action.imageVersionId);
      return {
        ...state,
        imageVersions: [
          ...otherImageVersions,
          {...currentImageVersion, installExtensions: action.extensions}
        ]
      }
    }
    case 'CHANGE_ENVIRONMENTS': {
      const currentImageVersion = state.imageVersions.find(imageVersion => imageVersion.imageVersionId === action.imageVersionId);
      const otherImageVersions = state.imageVersions.filter(imageVersion => imageVersion.imageVersionId !== action.imageVersionId);
      return {
        ...state,
        imageVersions: [
          ...otherImageVersions,
          {...currentImageVersion, environments: action.environments}
        ]
      }
    }
    case 'CHANGE_PORTS': {
      const currentImageVersion = state.imageVersions.find(imageVersion => imageVersion.imageVersionId === action.imageVersionId);
      const otherImageVersions = state.imageVersions.filter(imageVersion => imageVersion.imageVersionId !== action.imageVersionId);
      return {
        ...state,
        imageVersions: [
          ...otherImageVersions,
          { ...currentImageVersion, ports: action.ports }
        ]
      }
    }
    default:
      return state;
  }
}

export default generateReducer;