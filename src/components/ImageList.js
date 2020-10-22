import React, {useCallback} from "react";
import ImageWrapper from "./image/ImageWrapper";
import {useDispatch} from "react-redux";
import {
  changeEnvironmentsInRequest,
  changeExtensionsInRequest, changePortsInRequest,
  removeImageVersionInRequest,
  updateImageVersionInRequest
} from "../store/actions/generateActions";

const ImageList = ({ images }) => {
  const dispatch = useDispatch();
  const handleUpdateImageVersionInRequest = useCallback(
    (newImageVersionId, previousImageVersionId) => dispatch(updateImageVersionInRequest(newImageVersionId, previousImageVersionId)),
    [dispatch]
  );
  const handleRemoveImageVersionInRequest = useCallback(
    (imageVersionId) => dispatch(removeImageVersionInRequest(imageVersionId)),
    [dispatch]
  );
  const handleChangeExtensionsInRequest = useCallback(
    (imageVersionId, extensions) => dispatch(changeExtensionsInRequest(imageVersionId, extensions)),
    [dispatch]
  );
  const handleChangeEnvironmentsInRequest = useCallback(
    (imageVersionId, environments) => dispatch(changeEnvironmentsInRequest(imageVersionId, environments)),
    [dispatch]
  );
  const handleChangePortsInRequest = useCallback(
    (imageVersionId, ports) => dispatch(changePortsInRequest(imageVersionId, ports)),
    [dispatch]
  );

  return (
    <div className="images">
      {images.map(image => {
        return (
          <ImageWrapper
            image={image}
            key={image.id}
            updateImageVersionInRequest={handleUpdateImageVersionInRequest}
            removeImageVersionInRequest={handleRemoveImageVersionInRequest}
            changeExtensionsInRequest={handleChangeExtensionsInRequest}
            changeEnvironmentsInRequest={handleChangeEnvironmentsInRequest}
            changePortsInRequest={handleChangePortsInRequest}
          />
        )
      })}
    </div>
  )
}

export default ImageList;