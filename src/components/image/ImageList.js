import React, {Component} from "react";
import ImageWrapper from "./ImageWrapper";

class ImageList extends Component {
  render() {
    const imageList = this.props.images.length ? (
      this.props.images.map(image => {
        return (
          <ImageWrapper
            image={image}
            key={image.id}
            updateImageVersion={this.props.updateImageVersion}
            removeImageVersion={this.props.removeImageVersion}
            changeExtensions={this.props.changeExtensions}
            changeEnvironments={this.props.changeEnvironments}
          />
        );
      })
    ) : (
      <div>No images</div>
    );
    return (
      <div style={{display: "grid", gridTemplateColumns: "1fr", gap: "10px"}}>
        {imageList}
      </div>
    )
  }
}

export default ImageList;