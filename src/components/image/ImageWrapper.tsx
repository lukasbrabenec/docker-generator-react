import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
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
import {
  GeneratePort,
  GenerateVolume,
} from '../../store/types/generate/generateTypes';
import { initImageDetail } from '../../store/actions/imageActions';
import Volumes from './Volumes';

interface IImageWrapperProps {
  image: Image;
  restartTypes: RestartType[] | undefined;
  updateImageVersionInRequest: (
    newImageVersionId: number,
    previousImageVersionId: number | undefined,
  ) => void;
  updateImageNameInRequest: (imageVersionId: number, imageName: string) => void;
  handleRemoveImage: (
    image: Image,
    imageVersion: ImageVersion | undefined,
  ) => void;
  changeExtensionsInRequest: (
    imageVersionId: number,
    extensions: Extension[],
  ) => void;
  changeEnvironmentsInRequest: (
    imageVersionId: number,
    environments: Environment[],
  ) => void;
  changePortsInRequest: (imageVersionId: number, ports: Port[]) => void;
  changeVolumesInRequest: (imageVersionId: number, volumes: Volume[]) => void;
  changeRestartTypeInRequest: (
    imageVersionId: number,
    restartType: RestartType,
  ) => void;
}

const ImageWrapper = ({
  image,
  restartTypes,
  updateImageVersionInRequest,
  updateImageNameInRequest,
  handleRemoveImage,
  changeExtensionsInRequest,
  changeEnvironmentsInRequest,
  changePortsInRequest,
  changeVolumesInRequest,
  changeRestartTypeInRequest,
}: IImageWrapperProps) => {
  const [selectedVersion, setSelectedVersion] = useState<ImageVersion>();
  const [environments, setEnvironments] = useState<Environment[]>([]);

  const delayedChangePorts = useMemo(
    () =>
      debounce(
        (selectedVersionId, ports) =>
          changePortsInRequest(selectedVersionId, ports),
        500,
      ),
    [changePortsInRequest],
  );

  const delayedChangeVolumes = useMemo(
    () =>
      debounce(
        (selectedVersionId, volumes) =>
          changeVolumesInRequest(selectedVersionId, volumes),
        500,
      ),
    [changeVolumesInRequest],
  );

  const delayedUpdateImageName = useMemo(
    () =>
      debounce(
        (selectedVersionId, imageName) =>
          updateImageNameInRequest(selectedVersionId, imageName),
        500,
      ),
    [updateImageNameInRequest],
  );

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
      typeof selectedVersion === 'object' ? selectedVersion.id : undefined;
    const newSelectedVersion = image.imageVersions!.find(
      (imageVersion: ImageVersion) => imageVersion.id === selectedVersionId,
    );
    if (typeof newSelectedVersion === 'object') {
      setSelectedVersion(newSelectedVersion);
      updateImageVersionInRequest(selectedVersionId, oldSelectedVersionId);
    }
  };

  const handleExtensionChange = (
    _e: React.ChangeEvent<{}>,
    extensions: Extension[],
  ) => {
    if (typeof selectedVersion === 'object') {
      changeExtensionsInRequest(selectedVersion.id, extensions);
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
    if (typeof selectedVersion === 'object') {
      changeEnvironmentsInRequest(selectedVersion.id, newEnvironments);
    }
  };

  const handlePortChange = (ports: GeneratePort[]) => {
    if (typeof selectedVersion === 'object') {
      delayedChangePorts(selectedVersion.id, ports);
    }
  };

  const handleVolumeChange = (volumes: GenerateVolume[]) => {
    if (typeof selectedVersion === 'object') {
      delayedChangeVolumes(selectedVersion.id, volumes);
    }
  };

  const handleRestartTypeChange = (e: React.ChangeEvent<{}>) => {
    if (typeof selectedVersion === 'object') {
      const target = e.target as HTMLSelectElement;
      if (typeof restartTypes !== 'undefined') {
        const selectedRestartType = restartTypes.find(
          (restartType: RestartType) =>
            restartType.id === parseInt(target.value, 10),
        );
        if (typeof selectedRestartType === 'object') {
          setSelectedVersion({
            ...selectedVersion,
            restartType: selectedRestartType,
          });
          changeRestartTypeInRequest(selectedVersion.id, selectedRestartType);
        }
      }
    }
  };

  return (
    <Paper
      variant="outlined"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderColor: 'rgba(0, 0, 0, 0.25)',
        padding: '10px',
      }}
    >
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
      <Typography variant="h4" component="h2">
        {`${image.name} image`}
      </Typography>
      {imageVersions !== undefined ? (
        <>
          <Paper variant="outlined" className="image-item-group-row">
            <ImageVersionSelect
              imageVersions={imageVersions}
              selectedVersion={selectedVersion}
              handleVersionChange={handleVersionChange}
            />
          </Paper>
          {typeof selectedVersion === 'object' ? (
            <Paper variant="outlined" className="image-item-group-row">
              <TextField
                label="Image name"
                key="image-name"
                onChange={(e) =>
                  delayedUpdateImageName(selectedVersion.id, e.target.value)
                }
                style={{ width: '300px' }}
              />
            </Paper>
          ) : null}
          <Fade
            in={!!(typeof selectedVersion === 'object' && restartTypes?.length)}
            exit={false}
            unmountOnExit
          >
            <Paper variant="outlined" className="image-item-group-row">
              {typeof selectedVersion === 'object' && restartTypes?.length ? (
                <>
                  <FormControl size="small" required>
                    <InputLabel htmlFor="restartTypes">Restart Type</InputLabel>
                    <Select
                      labelId="restartTypes"
                      id="restartTypes"
                      value={
                        typeof selectedVersion?.restartType === 'undefined'
                          ? ''
                          : selectedVersion?.restartType.id
                      }
                      style={{ width: 500 }}
                      onChange={handleRestartTypeChange}
                      required
                    >
                      {restartTypes.map((restartType: RestartType) => {
                        return (
                          <MenuItem value={restartType.id} key={restartType.id}>
                            {restartType.type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </>
              ) : null}
            </Paper>
          </Fade>
          <Fade
            in={!!selectedVersion?.environments?.length}
            exit={false}
            unmountOnExit
          >
            <Paper variant="outlined" className="image-item-group-column">
              {typeof selectedVersion === 'object' &&
              selectedVersion.environments.length ? (
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
          </Fade>
          <Fade
            in={!!selectedVersion?.extensions?.length}
            exit={false}
            unmountOnExit
          >
            {typeof selectedVersion === 'object' &&
            selectedVersion.extensions.length ? (
              <Paper variant="outlined" className="image-item-group-column">
                <Typography variant="h5" component="h3">
                  Extensions
                </Typography>
                <div className="image-item-group-row">
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
                      image.name.charAt(0).toUpperCase() + image.name.slice(1)
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
          </Fade>
          <Fade
            in={!!selectedVersion?.ports?.length}
            exit={false}
            unmountOnExit
          >
            <Paper variant="outlined" className="image-item-group-column">
              {selectedVersion?.ports?.length ? (
                <>
                  <Typography variant="h5" component="h3">
                    Ports
                  </Typography>
                  <Ports
                    ports={selectedVersion.ports}
                    handlePortChange={handlePortChange}
                  />
                </>
              ) : null}
            </Paper>
          </Fade>

          <Fade
            in={!!selectedVersion?.volumes?.length}
            exit={false}
            unmountOnExit
          >
            <Paper variant="outlined" className="image-item-group-column">
              {selectedVersion?.volumes?.length ? (
                <>
                  <Typography variant="h5" component="h3">
                    Volumes
                  </Typography>
                  <Volumes
                    volumes={selectedVersion.volumes}
                    handleVolumeChange={handleVolumeChange}
                  />
                </>
              ) : null}
            </Paper>
          </Fade>
        </>
      ) : (
        <>
          {!image.error ? (
            <CircularProgress style={{ margin: 'auto' }} />
          ) : (
            <>
              <Alert severity="error">{image.error}</Alert>
              <IconButton onClick={() => handleRefreshDetail(image)}>
                <Refresh />
              </IconButton>
            </>
          )}
        </>
      )}
    </Paper>
  );
};

export default ImageWrapper;
