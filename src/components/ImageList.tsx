import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ImageWrapper from './image/ImageWrapper';
import {
  changeEnvironmentsInRequest,
  changeExtensionsInRequest,
  changePortsInRequest,
  removeImageVersionInRequest,
  updateImageVersionInRequest,
} from '../store/actions/generateActions';
import {
  Environment,
  Extension,
  Image,
  Port,
} from '../store/types/image/imageTypes';

interface IImageListProps {
  images: Image[];
}

const ImageList = ({ images }: IImageListProps) => {
  const dispatch = useDispatch();
  const handleUpdateImageVersionInRequest = useCallback(
    (newImageVersionId: number, previousImageVersionId: number | undefined) =>
      dispatch(
        updateImageVersionInRequest(newImageVersionId, previousImageVersionId),
      ),
    [dispatch],
  );
  const handleRemoveImageVersionInRequest = useCallback(
    (imageVersionId: number) =>
      dispatch(removeImageVersionInRequest(imageVersionId)),
    [dispatch],
  );
  const handleChangeExtensionsInRequest = useCallback(
    (imageVersionId: number, extensions: Extension[]) =>
      dispatch(changeExtensionsInRequest(imageVersionId, extensions)),
    [dispatch],
  );
  const handleChangeEnvironmentsInRequest = useCallback(
    (imageVersionId: number, environments: Environment[]) =>
      dispatch(changeEnvironmentsInRequest(imageVersionId, environments)),
    [dispatch],
  );
  const handleChangePortsInRequest = useCallback(
    (imageVersionId: number, ports: Port[]) =>
      dispatch(changePortsInRequest(imageVersionId, ports)),
    [dispatch],
  );

  return (
    <div className="images">
      {images.map((image) => {
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
        );
      })}
    </div>
  );
};

export default ImageList;
