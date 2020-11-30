import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import ExtensionsDropdown from './ExtensionsDropdown';
import Environments from './Environments';
import ImageSwitch from './ImageSwitch';
import ImageVersionSelect from './ImageVersionSelect';
import Ports from './Ports';
import {
  Environment,
  Extension,
  Image,
  ImageVersion,
  Port,
} from '../../store/types/image/imageTypes';
import { GeneratePort } from '../../store/types/generate/generateTypes';

interface IImageWrapperProps {
  image: Image;
  updateImageVersionInRequest: (
    newImageVersionId: number,
    previousImageVersionId: number | undefined,
  ) => void;
  removeImageVersionInRequest: (imageVersionId: number) => void;
  changeExtensionsInRequest: (
    imageVersionId: number,
    extensions: Extension[],
  ) => void;
  changeEnvironmentsInRequest: (
    imageVersionId: number,
    environments: Environment[],
  ) => void;
  changePortsInRequest: (imageVersionId: number, ports: Port[]) => void;
}

const ImageWrapper = ({
  image,
  updateImageVersionInRequest,
  removeImageVersionInRequest,
  changeExtensionsInRequest,
  changeEnvironmentsInRequest,
  changePortsInRequest,
}: IImageWrapperProps) => {
  const [imageChecked, setImageChecked] = useState<boolean>(false);
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

  const { imageVersions } = image;

  const handleImageChange = () => {
    setImageChecked(!imageChecked);
    if (imageChecked && typeof selectedVersion === 'object') {
      removeImageVersionInRequest(selectedVersion.id);
    }
  };

  const handleVersionChange = (e: React.ChangeEvent<{}>) => {
    const selectedVersionId = parseInt(
      (e.target as HTMLInputElement).value,
      10,
    );
    const oldSelectedVersionId =
      typeof selectedVersion === 'object' ? selectedVersion.id : undefined;
    const newSelectedVersion = image.imageVersions.find(
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

  return (
    <Paper variant="outlined" className="image">
      <div>
        <ImageSwitch image={image} handleCheckImage={handleImageChange} />
      </div>
      <Fade in={imageChecked} exit={false} unmountOnExit>
        <Paper variant="outlined" className="image-item-group-row">
          <ImageVersionSelect
            imageVersions={imageVersions}
            selectedVersion={selectedVersion}
            handleVersionChange={handleVersionChange}
          />
        </Paper>
      </Fade>
      <Fade
        in={
          !!(
            imageChecked &&
            typeof selectedVersion === 'object' &&
            selectedVersion.environments &&
            selectedVersion.environments.length
          )
        }
        exit={false}
        unmountOnExit
      >
        <Paper variant="outlined">
          {imageChecked &&
          typeof selectedVersion === 'object' &&
          selectedVersion.environments.length ? (
            <>
              <p>Environments</p>
              <Environments
                environments={selectedVersion.environments}
                handleEnvironmentChange={handleEnvironmentChange}
              />
            </>
          ) : null}
        </Paper>
      </Fade>
      <Fade
        in={
          !!(
            imageChecked &&
            typeof selectedVersion === 'object' &&
            selectedVersion.extensions &&
            selectedVersion.extensions.length
          )
        }
        exit={false}
        unmountOnExit
      >
        {imageChecked &&
        typeof selectedVersion === 'object' &&
        selectedVersion.extensions.length ? (
          <Paper variant="outlined">
            <p>Extensions</p>
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
        in={
          !!(
            imageChecked &&
            typeof selectedVersion === 'object' &&
            selectedVersion.ports &&
            selectedVersion.ports.length
          )
        }
        exit={false}
        unmountOnExit
      >
        <Paper variant="outlined">
          {imageChecked &&
          typeof selectedVersion === 'object' &&
          selectedVersion.ports &&
          selectedVersion.ports.length ? (
            <>
              <p>Ports</p>
              <Ports
                ports={selectedVersion.ports}
                handlePortChange={handlePortChange}
              />
            </>
          ) : null}
        </Paper>
      </Fade>
    </Paper>
  );
};

export default ImageWrapper;
