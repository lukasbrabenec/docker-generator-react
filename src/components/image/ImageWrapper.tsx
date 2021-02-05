import React, { ChangeEvent, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Delete, Refresh } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExtensionsDropdown from './ExtensionsDropdown';
import Environments from './Environments';
import ImageVersionSelect from './ImageVersionSelect';
import Ports from './Ports';
import {
  Environment,
  Extension,
  Image,
  ImageVersion,
  Port,
  RestartType,
  Volume,
} from '../../store/types/image/imageTypes';
import { initImageDetail } from '../../store/actions/imageActions';
import Volumes from './Volumes';
import DependenciesDropDown from './DependenciesDropdown';

interface IImageWrapperProps {
  image: Image;
  selectedImages: Image[];
  restartTypes: RestartType[] | undefined;
  updateImageVersion: (
    newImageVersion: ImageVersion,
    previousImageVersionID: number | undefined,
  ) => void;
  updateImageName: (imageVersionID: number, imageName: string) => void;
  handleRemoveImage: (
    image: Image,
    imageVersion: ImageVersion | undefined,
  ) => void;
  changeExtensions: (imageVersionID: number, extensions: Extension[]) => void;
  changeEnvironments: (
    imageVersionId: number,
    environments: Environment[],
  ) => void;
  changePorts: (imageVersionID: number, ports: Port[]) => void;
  changeVolumes: (imageVersionID: number, volumes: Volume[]) => void;
  changeDependencies: (
    imageVersion: ImageVersion,
    image: Image,
    dependencies: Image[],
  ) => void;
  changeRestartType: (imageVersionID: number, restartType: RestartType) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      width: '95%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: '10px',
      margin: '10px',
      gap: '10px',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    column: {
      width: '95%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '10px',
      margin: '10px',
      gap: '10px',
    },
  }),
);

const ImageWrapper = ({
  image,
  selectedImages,
  restartTypes,
  updateImageVersion,
  updateImageName,
  handleRemoveImage,
  changeExtensions,
  changeEnvironments,
  changePorts,
  changeVolumes,
  changeRestartType,
  changeDependencies,
}: IImageWrapperProps): JSX.Element => {
  const [selectedVersion, setSelectedVersion] = useState<
    ImageVersion | undefined
  >(undefined);
  const [environments, setEnvironments] = useState<Environment[]>([]);

  const dispatch = useDispatch();
  const handleRefreshDetail = (selectedImage: Image) => {
    dispatch(initImageDetail(selectedImage));
  };

  const { imageVersions } = image;

  const handleVersionChange = (e: React.ChangeEvent<{}>) => {
    const selectedVersionId = parseInt(
      (e.target as HTMLInputElement).value,
      10,
    );
    const oldSelectedVersionId =
      selectedVersion !== undefined ? selectedVersion.id : undefined;
    const newSelectedVersion = image.imageVersions?.find(
      (imageVersion: ImageVersion) => imageVersion.id === selectedVersionId,
    );
    if (newSelectedVersion !== undefined && restartTypes !== undefined) {
      setSelectedVersion({
        ...newSelectedVersion,
        restartType: restartTypes[0],
      });
      updateImageVersion(
        {
          ...newSelectedVersion,
          restartType: restartTypes[0],
        },
        oldSelectedVersionId,
      );
    }
  };

  const handleExtensionChange = (
    _e: React.ChangeEvent<{}>,
    extensions: Extension[],
  ) => {
    if (selectedVersion !== undefined) {
      changeExtensions(selectedVersion.id, extensions);
    }
  };

  const handleEnvironmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const otherEnvironments = environments.filter(
      (environment: Environment) =>
        environment.id !== parseInt(e.target.id, 10),
    );
    const newEnvironments = [
      ...otherEnvironments,
      { id: parseInt(e.target.id, 10), value: e.target.value },
    ];
    setEnvironments(newEnvironments);
    if (selectedVersion !== undefined) {
      changeEnvironments(selectedVersion.id, newEnvironments);
    }
  };

  const handlePortChange = (ports: Port[]) => {
    if (selectedVersion !== undefined) {
      changePorts(selectedVersion.id, ports);
      setSelectedVersion({ ...selectedVersion, ports });
    }
  };

  const handleVolumeChange = (volumes: Volume[]) => {
    if (selectedVersion !== undefined) {
      changeVolumes(selectedVersion.id, volumes);
      setSelectedVersion({ ...selectedVersion, volumes });
    }
  };

  const handleRestartTypeChange = (e: React.ChangeEvent<{}>) => {
    if (selectedVersion !== undefined) {
      const target = e.target as HTMLSelectElement;
      if (restartTypes !== undefined) {
        const selectedRestartType = restartTypes.find(
          (restartType: RestartType) =>
            restartType.id === parseInt(target.value, 10),
        );
        if (selectedRestartType !== undefined) {
          setSelectedVersion({
            ...selectedVersion,
            restartType: selectedRestartType,
          });
          changeRestartType(selectedVersion.id, selectedRestartType);
        }
      }
    }
  };

  const handleDependenciesChange = (
    _e: React.ChangeEvent<{}>,
    images: Image[],
  ) => {
    if (selectedVersion !== undefined) {
      changeDependencies(selectedVersion, image, images);
    }
  };

  const handleAddPort = () => {
    if (selectedVersion !== undefined) {
      const maxPortID =
        selectedVersion.ports !== undefined && selectedVersion.ports.length
          ? Math.max(...selectedVersion.ports.map((port: Port) => port.id))
          : 1;
      const newPort = {
        id: maxPortID + 1,
        inward: '',
        outward: '',
        exposedToHost: false,
        exposedToContainers: false,
      };
      handlePortChange(
        selectedVersion.ports !== undefined
          ? [...selectedVersion.ports, newPort]
          : [newPort],
      );
    }
  };

  const handleAddVolume = () => {
    if (selectedVersion !== undefined) {
      const maxVolumeID =
        selectedVersion.volumes !== undefined && selectedVersion.volumes.length
          ? Math.max(
              ...selectedVersion.volumes.map((volume: Volume) => volume.id),
            )
          : 1;
      const newVolume = {
        id: maxVolumeID + 1,
        containerPath: '',
        hostPath: '',
      };
      handleVolumeChange(
        selectedVersion.volumes !== undefined
          ? [...selectedVersion.volumes, newVolume]
          : [newVolume],
      );
    }
  };

  const handleRemovePort = (portID: number) => {
    if (selectedVersion !== undefined && selectedVersion.ports !== undefined) {
      handlePortChange([
        ...selectedVersion.ports.filter((port: Port) => port.id !== portID),
      ]);
    }
  };

  const handleRemoveVolume = (volumeID: number) => {
    if (
      selectedVersion !== undefined &&
      selectedVersion.volumes !== undefined
    ) {
      handleVolumeChange([
        ...selectedVersion.volumes.filter(
          (volume: Volume) => volume.id !== volumeID,
        ),
      ]);
    }
  };

  const classes = useStyles();

  return (
    <>
      <Tooltip title="Remove image">
        <IconButton
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
          }}
          type="button"
          onClick={() => handleRemoveImage(image, selectedVersion)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      <Paper
        variant="outlined"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h4" component="h2">
          {`${image.name} image`}
        </Typography>
        {imageVersions !== undefined ? (
          <>
            <Paper variant="outlined" className={classes.row}>
              <ImageVersionSelect
                imageVersions={imageVersions}
                selectedVersion={selectedVersion}
                handleVersionChange={handleVersionChange}
              />
            </Paper>
            {selectedVersion !== undefined ? (
              <>
                <Paper variant="outlined" className={classes.row}>
                  <TextField
                    label="Image name"
                    key="image-name"
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      updateImageName(selectedVersion.id, e.target.value)
                    }
                    style={{ width: '60%' }}
                  />
                </Paper>
                {restartTypes?.length ? (
                  <Paper variant="outlined" className={classes.row}>
                    <FormControl
                      size="small"
                      style={{ minWidth: '60%' }}
                      required
                    >
                      <InputLabel htmlFor="restartTypes">
                        Restart Type
                      </InputLabel>
                      <Select
                        labelId="restartTypes"
                        id="restartTypes"
                        value={
                          typeof selectedVersion?.restartType === 'undefined'
                            ? restartTypes?.[0].id
                            : selectedVersion?.restartType.id
                        }
                        onChange={handleRestartTypeChange}
                        required
                      >
                        {restartTypes.map((restartType: RestartType) => {
                          return (
                            <MenuItem
                              value={restartType.id}
                              key={restartType.id}
                            >
                              {restartType.type}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Paper>
                ) : null}
                {selectedImages?.length > 1 ? (
                  <Paper variant="outlined" className={classes.row}>
                    <DependenciesDropDown
                      currentImage={image}
                      selectedImages={selectedImages}
                      handleDependenciesChange={handleDependenciesChange}
                    />
                  </Paper>
                ) : null}
                <Paper variant="outlined" className={classes.column}>
                  {selectedVersion.environments?.length ? (
                    <>
                      <Typography variant="h5" component="h3">
                        Environments
                      </Typography>
                      <Environments
                        environments={selectedVersion.environments}
                        handleEnvironmentChange={handleEnvironmentChange}
                      />
                    </>
                  ) : null}
                </Paper>
                {selectedVersion.extensions?.length ? (
                  <Paper variant="outlined" className={classes.column}>
                    <Typography variant="h5" component="h3">
                      Extensions
                    </Typography>
                    <div className={classes.row}>
                      <ExtensionsDropdown
                        id="extension-system"
                        name="System Extensions"
                        extensions={selectedVersion.extensions.filter(
                          (extension) => !extension.special,
                        )}
                        handleExtensionChange={handleExtensionChange}
                      />
                      <ExtensionsDropdown
                        id="extension-special"
                        name={`${
                          image.name.charAt(0).toUpperCase() +
                          image.name.slice(1)
                        } Extensions`}
                        extensions={selectedVersion.extensions.filter(
                          (extension) => extension.special,
                        )}
                        handleExtensionChange={handleExtensionChange}
                      />
                    </div>
                  </Paper>
                ) : (
                  <></>
                )}
                <Paper variant="outlined" className={classes.column}>
                  <>
                    <Typography variant="h5" component="h3">
                      Ports
                    </Typography>
                    <Ports
                      ports={selectedVersion.ports}
                      handlePortChange={handlePortChange}
                      handleAddPort={handleAddPort}
                      handleRemovePort={handleRemovePort}
                    />
                  </>
                </Paper>
                <Paper variant="outlined" className={classes.column}>
                  <>
                    <Typography variant="h5" component="h3">
                      Volumes
                    </Typography>
                    <Volumes
                      volumes={selectedVersion.volumes}
                      handleVolumeChange={handleVolumeChange}
                      handleAddVolume={handleAddVolume}
                      handleRemoveVolume={handleRemoveVolume}
                    />
                  </>
                </Paper>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            {!image.error ? (
              <CircularProgress style={{ margin: 'auto' }} />
            ) : (
              <>
                <Alert severity="error">{image.error}</Alert>
                <div>
                  <IconButton onClick={() => handleRefreshDetail(image)}>
                    <Refresh />
                  </IconButton>
                </div>
              </>
            )}
          </>
        )}
      </Paper>
    </>
  );
};

export default ImageWrapper;
