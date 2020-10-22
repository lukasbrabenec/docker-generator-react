import React, {useCallback, useState} from "react";
import { debounce } from "lodash";
import ExtensionsDropdown from "./ExtensionsDropdown";
import Environments from "./Environments";
import ImageSwitch from "./ImageSwitch";
import ImageVersionSelect from "./ImageVersionSelect";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import Ports from "./Ports";

const ImageWrapper = ({image, updateImageVersionInRequest, removeImageVersionInRequest, changeExtensionsInRequest, changeEnvironmentsInRequest, changePortsInRequest}) => {
  const [imageChecked, setImageChecked] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [environments, setEnvironments] = useState([]);

  const delayedChangePorts = useCallback(debounce((selectedVersionId, ports) => changePortsInRequest(selectedVersionId, ports), 500), []);


  const {imageVersions} = image;
  const imageClass = imageChecked ? "image-checked" : "image";

  const handleImageChange = () => {
    setImageChecked(!imageChecked);
    if (imageChecked && selectedVersion) {
      removeImageVersionInRequest(selectedVersion.id);
    }
  }

  const handleVersionChange = (e) => {
    const selectedVersionId = e.target.value;
    setSelectedVersion(image.imageVersions.find(imageVersion => imageVersion.id === selectedVersionId));
    updateImageVersionInRequest(selectedVersionId, selectedVersion ? selectedVersion.id : null);
  }

  const handleExtensionChange = (e, extensions) => {
    changeExtensionsInRequest(selectedVersion.id, extensions);
  }

  const handleEnvironmentChange = (e) => {
    const otherEnvironments = environments.filter(environment => environment.id !== e.target.id);
    const newEnvironments = [
      ...otherEnvironments,
      { id: e.target.id, value: e.target.value }
    ];
    setEnvironments(newEnvironments);
    changeEnvironmentsInRequest(selectedVersion.id, newEnvironments);
  }

  const handlePortChange = (ports) => {
    delayedChangePorts(selectedVersion.id, ports);
  }

  return (
    <Paper variant="outlined" className={imageClass}>
      <div style={{gridArea: "image"}}>
        <ImageSwitch image={image} handleCheckImage={handleImageChange}/>
      </div>
      <Fade in={imageChecked} exit={false} unmountOnExit={true}>
        <Paper style={{gridArea: "version", padding: "10px"}}>
          <p>Version</p>
          <ImageVersionSelect imageVersions={imageVersions} selectedVersion={selectedVersion}
                              handleVersionChange={handleVersionChange}/>
        </Paper>
      </Fade>
      <Fade in={!!(imageChecked && selectedVersion && selectedVersion.environments && selectedVersion.environments.length)} exit={false} unmountOnExit={true}>
        <div style={{gridArea: "environment"}}>
          {imageChecked && selectedVersion && selectedVersion.environments.length
            ? <Environments
              environments={selectedVersion.environments}
              handleEnvironmentChange={handleEnvironmentChange}/>
            : null
          }
        </div>
      </Fade>
      <Fade in={!!(imageChecked && selectedVersion && selectedVersion.extensions && selectedVersion.extensions.length)} exit={false} unmountOnExit={true}>
        {imageChecked && selectedVersion && selectedVersion.extensions.length ? (
          <div className="extensions">
            <Paper variant="outlined" className="extension" style={{gridArea: "extension-system"}}>
              <ExtensionsDropdown
                id="extension-system"
                name="System Extensions"
                extensions={selectedVersion.extensions.filter(extension => extension.extension.special !== true)}
                handleExtensionChange={handleExtensionChange}/>
            </Paper>
            <Paper variant="outlined" className="extension" style={{gridArea: "extension-special"}}>
              <ExtensionsDropdown
                id="extension-special"
                name={`${image.name.charAt(0).toUpperCase() + image.name.slice(1)} Extensions`}
                extensions={selectedVersion.extensions.filter(extension => extension.extension.special !== false)}
                handleExtensionChange={handleExtensionChange}/>
            </Paper>
          </div>
        ) : <div className="extensions"> </div>}
      </Fade>
      <Fade in={!!(imageChecked && selectedVersion && selectedVersion.ports && selectedVersion.ports.length)} exit={false} unmountOnExit={true}>
        <div style={{gridArea: "ports"}}>
          {imageChecked && selectedVersion && selectedVersion.ports && selectedVersion.ports.length ? (
            <Paper variant="outlined">
              <Ports ports={selectedVersion.ports} handlePortChange={handlePortChange} />
            </Paper>
          ) : null}
        </div>
      </Fade>
    </Paper>
  )
}

export default ImageWrapper;