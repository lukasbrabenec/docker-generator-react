import React, {Component} from "react";
import ImageList from "./image/ImageList";
import Container from "@material-ui/core/Container";
import {initImages} from "../store/actions/imageActions";
import {CircularProgress} from "@material-ui/core";
import {connect} from "react-redux";
import {
  changeExtensions,
  updateImageVersion,
  changeEnvironments,
  generate,
  removeImageVersion, changePorts
} from "../store/actions/generateActions";
import Button from "@material-ui/core/Button";

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.initImages();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.generate();
  }

  render() {
    return (
      <Container maxWidth="lg">
        {!this.props.imagesError && this.props.images
          ?
          <form onSubmit={this.handleSubmit}>
            <ImageList
              images={this.props.images}
              updateImageVersion={this.props.updateImageVersion}
              removeImageVersion={this.props.removeImageVersion}
              changeExtensions={this.props.changeExtensions}
              changeEnvironments={this.props.changeEnvironments}
              changePorts={this.props.changePorts}
            />
            <Button type="submit">Generate</Button>
          </form>
          : <CircularProgress style={{margin: "auto"}}/>}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.image.images,
    imagesError: state.image.imagesError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initImages: () => dispatch(initImages()),
    updateImageVersion: (newImageVersionId, previousImageVersionId) => dispatch(updateImageVersion(newImageVersionId, previousImageVersionId)),
    removeImageVersion: (imageVersionId) => dispatch(removeImageVersion(imageVersionId)),
    changeExtensions: (imageVersionId, extensions) => dispatch(changeExtensions(imageVersionId, extensions)),
    changeEnvironments: (imageVersionId, environments) => dispatch(changeEnvironments(imageVersionId, environments)),
    changePorts: (imageVersionId, ports) => dispatch(changePorts(imageVersionId, ports)),
    generate: () => dispatch(generate())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);