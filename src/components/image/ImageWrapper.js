import React from "react";
import { debounce } from "lodash";
import ExtensionsDropdown from "./ExtensionsDropdown";
import Environments from "./Environments";
import ImageSwitch from "./ImageSwitch";
import ImageVersionSelect from "./ImageVersionSelect";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import Ports from "./Ports";

class ImageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageChecked: false,
      selectedVersion: '',
      environments: []
    }
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleVersionChange = this.handleVersionChange.bind(this);
    this.handleExtensionChange = this.handleExtensionChange.bind(this);
    this.handleEnvironmentChange = this.handleEnvironmentChange.bind(this);
    this.handlePortChange = debounce(this.handlePortChange.bind(this), 500);
  }

  handleImageChange() {
    if (this.state.imageChecked && this.state.selectedVersion) {
      this.props.removeImageVersion(this.state.selectedVersion.id);
    }
    this.setState({
      ...this.state,
      imageChecked: !this.state.imageChecked,
      selectedVersion: this.state.imageChecked ? '' : this.state.imageChecked
    });
  }

  handleVersionChange(event) {
    this.setState({
      ...this.state,
      selectedVersion: this.props.image.imageVersions.find(imageVersion => imageVersion.id === event.target.value)
    });
    this.props.updateImageVersion(event.target.value, this.state.selectedVersion ? this.state.selectedVersion.id : null);
  }

  handleExtensionChange(event, extensions) {
    this.props.changeExtensions(this.state.selectedVersion.id, extensions);
  }

  handleEnvironmentChange(event) {
    const otherEnvironments = this.state.environments.filter((environment) => environment.id !== event.target.id);
    const environments = [
      ...otherEnvironments,
      {id: event.target.id, value: event.target.value}
    ];
    this.setState({
      ...this.state,
      environments
    });
    this.props.changeEnvironments(this.state.selectedVersion.id, environments);
  }

  handlePortChange(ports) {
    this.props.changePorts(this.state.selectedVersion.id, ports);
  }

  render() {
    const {imageVersions} = this.props.image;
    const {imageChecked, selectedVersion} = this.state;
    const imageClass = imageChecked ? "image-checked" : "image";

    return (
      <Paper variant="outlined" className={imageClass}>
        <div style={{gridArea: "image"}}>
          <ImageSwitch image={this.props.image} handleCheckImage={this.handleImageChange}/>
        </div>
        <Fade in={imageChecked} exit={false} unmountOnExit={true}>
          <div style={{gridArea: "version"}}>
            <ImageVersionSelect imageVersions={imageVersions} selectedVersion={selectedVersion}
                                handleVersionChange={this.handleVersionChange}/>
          </div>
        </Fade>
        <Fade in={!!(selectedVersion && selectedVersion.environments && selectedVersion.environments.length)} exit={false}
              unmountOnExit={true}>
          <div style={{gridArea: "environment"}}>
            {selectedVersion && selectedVersion.environments.length
              ? <Environments
                environments={selectedVersion.environments}
                handleEnvironmentChange={this.handleEnvironmentChange}/>
              : null
            }
          </div>
        </Fade>
        <Fade in={!!(selectedVersion && selectedVersion.extensions && selectedVersion.extensions.length)} exit={false} unmountOnExit={true}>
          {selectedVersion && selectedVersion.extensions.length ? (
            <div className="extensions">
              <Paper variant="outlined" className="extension" style={{gridArea: "extension-system"}}>
                <ExtensionsDropdown
                  id="extension-system"
                  name="System Extensions"
                  extensions={this.state.selectedVersion.extensions.filter(extension => extension.extension.special !== true)}
                  handleExtensionChange={this.handleExtensionChange}/>
              </Paper>
              <Paper variant="outlined" className="extension" style={{gridArea: "extension-special"}}>
                <ExtensionsDropdown
                  id="extension-special"
                  name={`${this.props.image.name.charAt(0).toUpperCase() + this.props.image.name.slice(1)} Extensions`}
                  extensions={this.state.selectedVersion.extensions.filter(extension => extension.extension.special !== false)}
                  handleExtensionChange={this.handleExtensionChange}/>
              </Paper>
            </div>
          ) : <div className="extensions"> </div>}
        </Fade>
        <Fade in={!!(selectedVersion && selectedVersion.ports && selectedVersion.ports.length)} exit={false} unmountOnExit={true}>
          <div style={{gridArea: "ports"}}>
          {selectedVersion && selectedVersion.ports && selectedVersion.ports.length ? (
              <Paper variant="outlined">
                <Ports ports={selectedVersion.ports} handlePortChange={this.handlePortChange} />
              </Paper>
          ) : null}
          </div>
        </Fade>
      </Paper>
    )
  }
}

export default ImageWrapper;