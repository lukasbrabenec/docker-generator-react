import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import Switch from "@material-ui/core/Switch";

const ImageSwitch = ({image, handleCheckImage}) => {
  return (
    <FormControlLabel
      control={
        <Switch label={image.name} value={image.id} onChange={handleCheckImage}/>
      }
      label={image.name}
    />
  )
}

export default ImageSwitch;