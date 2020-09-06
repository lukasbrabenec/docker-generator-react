import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import React from "react";

const ImageVersionSelect = ({imageVersions, selectedVersion, handleVersionChange}) => {
  const versionItems = imageVersions.length ? imageVersions.map((imageVersion) => {
    return (
      <MenuItem value={imageVersion.id} key={imageVersion.id}>{imageVersion.version}</MenuItem>
    )
  }) : null;

  return versionItems ? (
    <FormControl style={{minWidth: "500px"}} size="small">
      <InputLabel htmlFor="versions">Version</InputLabel>
      <Select labelId="versions" id="versions" value={selectedVersion ? selectedVersion.id : ''}
              onChange={handleVersionChange}>
        {versionItems}
      </Select>
    </FormControl>
  ) : <p>no versions</p>
}

export default ImageVersionSelect;