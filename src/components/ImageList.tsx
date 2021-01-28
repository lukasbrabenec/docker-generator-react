import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  changeEnvironments,
  changeExtensions,
  changePorts,
  removeImageVersionInRequest,
  updateImageVersion,
  changeVolumes,
  changeRestartType,
  updateImageName,
  changeDependencies,
} from '../store/actions/requestActions';
import {
  Environment,
  Extension,
  Image,
  ImageVersion,
  Port,
  RestartType,
  Volume,
} from '../store/types/image/imageTypes';

import ImageWrapper from './image/ImageWrapper';
import { initImageDetail } from '../store/actions/imageActions';

interface IImageListProps {
  images: Image[];
  restartTypes: RestartType[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    column: {
      display: 'flex',
      flexDirection: 'column',
      width: '49%',
      [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
        width: '100%',
      },
    },
    // disable clickable subheader till it's fixed
    subheader: {
      pointerEvents: 'none',
    },
  }),
);

const ImageList = ({ images, restartTypes }: IImageListProps): JSX.Element => {
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const dispatch = useDispatch();
  const handleUpdateImageVersion = useCallback(
    (
      newImageVersion: ImageVersion,
      previousImageVersionID: number | undefined,
    ) => dispatch(updateImageVersion(newImageVersion, previousImageVersionID)),
    [dispatch],
  );
  const handleUpdateImageName = useCallback(
    (imageVersionID: number, imageName: string) =>
      dispatch(updateImageName(imageVersionID, imageName)),
    [dispatch],
  );
  const handleChangeExtensions = useCallback(
    (imageVersionID: number, extensions: Extension[]) =>
      dispatch(changeExtensions(imageVersionID, extensions)),
    [dispatch],
  );
  const handleChangeEnvironments = useCallback(
    (imageVersionID: number, environments: Environment[]) =>
      dispatch(changeEnvironments(imageVersionID, environments)),
    [dispatch],
  );
  const handleChangePorts = useCallback(
    (imageVersionID: number, ports: Port[]) =>
      dispatch(changePorts(imageVersionID, ports)),
    [dispatch],
  );
  const handleChangeVolumes = useCallback(
    (imageVersionID: number, volumes: Volume[]) =>
      dispatch(changeVolumes(imageVersionID, volumes)),
    [dispatch],
  );
  const handleChangeRestartType = useCallback(
    (imageVersionID: number, restartType: RestartType) =>
      dispatch(changeRestartType(imageVersionID, restartType)),
    [dispatch],
  );
  const handleChangeDependencies = (
    imageVersion: ImageVersion,
    image: Image,
    dependencies: Image[],
  ) => {
    dispatch(changeDependencies(imageVersion, dependencies));
    const newSelectedImages = selectedImages.map((selectedImage: Image) => {
      const dependentImage = dependencies
        ? dependencies.find(
            (dependency: Image) => selectedImage.id === dependency.id,
          )
        : undefined;
      if (dependentImage !== undefined) {
        const selectedImageHaveCurrentDependency = selectedImage.dependencies
          ? selectedImage.dependencies.find(
              (dependencyImage: Image) => dependencyImage.id === image.id,
            ) !== undefined
          : false;
        // already have that dependency
        if (!selectedImageHaveCurrentDependency) {
          return {
            ...selectedImage,
            dependencies: selectedImage.dependencies
              ? [...selectedImage.dependencies, image]
              : [image],
          };
        }
        return selectedImage;
      }
      // current dependency haven't come -- remove it
      const filteredDependencies = selectedImage.dependencies
        ? selectedImage.dependencies.filter(
            (dependencyImage: Image) => dependencyImage.id !== image.id,
          )
        : undefined;
      if (filteredDependencies !== undefined) {
        return { ...selectedImage, dependencies: filteredDependencies };
      }
      return selectedImage;
    });
    setSelectedImages(newSelectedImages);
  };

  const handleSelectImage = (e: React.ChangeEvent<{}>) => {
    const selectedImageID = parseInt((e.target as HTMLInputElement).value, 10);
    const newSelectedImage = images.find((image: Image) => {
      return image.id === selectedImageID;
    });
    if (newSelectedImage) {
      if (newSelectedImage.imageVersions === undefined) {
        // init image versions only when it is not already stored in redux
        dispatch(initImageDetail(newSelectedImage));
      }
      const newSelected = selectedImages
        ? [...selectedImages, newSelectedImage]
        : [newSelectedImage];
      setSelectedImages(newSelected);
    }
  };

  const handleRemoveImage = (
    image: Image,
    imageVersion: ImageVersion | undefined,
  ) => {
    dispatch(removeImageVersionInRequest(imageVersion, image));
    setSelectedImages(
      selectedImages?.filter(
        (selectedImage: Image) => selectedImage.id !== image.id,
      ),
    );
  };

  const classes = useStyles();
  const availableImageItems = images
    // filter selected images
    .filter(
      (image: Image) =>
        selectedImages?.filter(
          (selectedImage: Image) => selectedImage.id === image.id,
        ).length === 0,
    )
    // sort by group ID and image name
    .sort((a: Image, b: Image) => {
      if (a.group.id > b.group.id) {
        return 1;
      }
      if (a.group.id === b.group.id) {
        return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
      }
      return -1;
    })
    // apply image groups
    .map((image: Image, i: number, array: Image[]) => {
      return [
        (array[i - 1] !== undefined &&
          image.group.id !== array[i - 1].group.id) ||
        i === 0 ? (
          <ListSubheader className={classes.subheader} disableSticky>
            {image.group.name}
          </ListSubheader>
        ) : null,
        <MenuItem key={image.id} value={image.id}>
          {image.name}
        </MenuItem>,
      ];
    });

  return (
    <>
      {images && images.length ? (
        <div
          style={{
            minWidth: '450px',
            alignSelf: 'center',
          }}
        >
          <Paper
            variant="outlined"
            style={{ borderColor: 'rgba(0, 0, 0, 0.25)', padding: '10px' }}
          >
            <FormControl
              size="small"
              fullWidth
              required={!selectedImages?.length}
            >
              <InputLabel htmlFor="images">
                {availableImageItems.length ? 'Add Image' : 'No Images'}
              </InputLabel>
              <Select
                labelId="images"
                id="images"
                value=""
                onChange={handleSelectImage}
                disabled={!availableImageItems.length}
                autoFocus={false}
              >
                {availableImageItems}
              </Select>
            </FormControl>
          </Paper>
        </div>
      ) : (
        <></>
      )}
      <div
        className="images"
        style={
          selectedImages?.length === 1
            ? { flexDirection: 'column', alignItems: 'center' }
            : {}
        }
      >
        {selectedImages ? (
          selectedImages.map((image: Image) => {
            return (
              <div className={classes.column} key={`${image.id}-image`}>
                <ImageWrapper
                  image={image}
                  selectedImages={selectedImages}
                  restartTypes={restartTypes}
                  updateImageVersion={handleUpdateImageVersion}
                  updateImageName={handleUpdateImageName}
                  handleRemoveImage={handleRemoveImage}
                  changeExtensions={handleChangeExtensions}
                  changeEnvironments={handleChangeEnvironments}
                  changePorts={handleChangePorts}
                  changeVolumes={handleChangeVolumes}
                  changeRestartType={handleChangeRestartType}
                  changeDependencies={handleChangeDependencies}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ImageList;
