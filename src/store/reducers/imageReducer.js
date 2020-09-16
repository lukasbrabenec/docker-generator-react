const initState = {
  isLoaded: false,
  images: null,
  imagesErr: null
}

const imageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'INIT_IMAGES_SUCCESS':
      return {
        isLoaded: true,
        imagesError: null,
        images: action.images
      }
    case 'INIT_IMAGES_ERROR':
      return {
        ...state,
        imagesError: action.err
      }
    default:
      return state;
  }
}

export default imageReducer;