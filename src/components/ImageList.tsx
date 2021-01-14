import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
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
  ImageVersion,
  Port,
} from '../store/types/image/imageTypes';

import ImageWrapper from './image/ImageWrapper';

interface IImageListProps {
  images: Image[];
}

const ImageList = ({ images }: IImageListProps) => {
  const [availableImages, setAvailableImages] = useState<Image[] | undefined>(
    images,
  );
  const [selectedImages, setSelectedImages] = useState<Image[] | undefined>(
    undefined,
  );

  const dispatch = useDispatch();
  const handleUpdateImageVersionInRequest = useCallback(
    (newImageVersionId: number, previousImageVersionId: number | undefined) =>
      dispatch(
        updateImageVersionInRequest(newImageVersionId, previousImageVersionId),
      ),
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

  const removeFromAvailableImages = (image: Image) => {
    setAvailableImages(
      availableImages?.filter(
        (availableImage: Image) => availableImage.id !== image.id,
      ),
    );
  };

  const handleSelectImage = (e: React.ChangeEvent<{}>) => {
    const selectedImageId = parseInt((e.target as HTMLInputElement).value, 10);
    const newSelectedImage = images.find((image: Image) => {
      return image.id === selectedImageId;
    });
    if (newSelectedImage) {
      const newSelected = selectedImages
        ? [...selectedImages, newSelectedImage]
        : [newSelectedImage];
      setSelectedImages(newSelected);
      removeFromAvailableImages(newSelectedImage);
    }
  };

  const handleRemoveImage = (
    image: Image,
    imageVersion: ImageVersion | undefined,
  ) => {
    setAvailableImages(availableImages ? [...availableImages, image] : [image]);
    setSelectedImages(
      selectedImages?.filter(
        (selectedImage: Image) => selectedImage.id !== image.id,
      ),
    );
    if (imageVersion !== undefined) {
      dispatch(removeImageVersionInRequest(imageVersion.id));
    }
  };

  const availableImageItems = availableImages
    ? availableImages.map((image: Image) => {
        return (
          <MenuItem key={image.id} value={image.id}>
            {image.name}
          </MenuItem>
        );
      })
    : undefined;

  return (
    <div className="images">
      {selectedImages ? (
        selectedImages.map((image) => {
          return (
            <ImageWrapper
              image={image}
              key={image.id}
              updateImageVersionInRequest={handleUpdateImageVersionInRequest}
              handleRemoveImage={handleRemoveImage}
              changeExtensionsInRequest={handleChangeExtensionsInRequest}
              changeEnvironmentsInRequest={handleChangeEnvironmentsInRequest}
              changePortsInRequest={handleChangePortsInRequest}
            />
          );
        })
      ) : (
        <></>
      )}
      {availableImages && availableImages.length ? (
        <>
          <Typography variant="body1">Available images</Typography>
          <Paper variant="outlined" className="image-item-group-row">
            <FormControl
              style={{ width: 500 }}
              size="small"
              focused={false}
              required={!selectedImages?.length}
            >
              <InputLabel htmlFor="images">image</InputLabel>
              <Select
                labelId="images"
                id="images"
                value=""
                onChange={handleSelectImage}
              >
                {availableImageItems}
              </Select>
            </FormControl>
          </Paper>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageList;