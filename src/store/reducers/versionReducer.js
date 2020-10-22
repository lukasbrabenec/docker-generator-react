const initState = {
  isLoaded: false,
  versions: null,
  versionsError: null
}

const versionReducer = (state = initState, action) => {
  switch (action.type) {
    case 'INIT_VERSIONS_SUCCESS':
      return {
        isLoaded: true,
        versionsError: null,
        versions: action.versions
      }
    case 'INIT_VERSIONS_ERROR':
      return {
        ...state,
        versionsError: action.err
      }
    default:
      return state;
  }
}

export default versionReducer;