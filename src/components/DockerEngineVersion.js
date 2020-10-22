import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import React from "react";

const DockerEngineRelease = ({versionsLoaded, versions, selectedVersion, handleVersionChange}) => {
  return (
    <>
    <FormControl style={{minWidth: "250px", gridArea: "docker-engine-version"}} size="small">
      <InputLabel htmlFor="dockerEngineVersions">Docker Engine Version</InputLabel>
      <Select labelId="dockerEngineVersions" id="dockerEngineVersions" value={selectedVersion ? selectedVersion : ''} onChange={handleVersionChange}>
        {versionsLoaded ? versions.map(version => {
          return (
            <MenuItem value={version.id} key={version.id}>{version.dockerEngineRelease}</MenuItem>
          )
        }) : null}
      </Select>
    </FormControl>
    <FormControl style={{minWidth: "250px", gridArea: "docker-compose-version"}} size="small">
      <InputLabel htmlFor="dockerComposeVersion">Docker Compose Version</InputLabel>
      <Select labelId="dockerComposeVersion" id="dockerComposeVersion" value={selectedVersion ? selectedVersion : ''} onChange={handleVersionChange}>
        {versionsLoaded ? versions.map(version => {
          return (
            <MenuItem value={version.id} key={version.id}>{version.composeVersion}</MenuItem>
          )
        }) : null}
      </Select>
    </FormControl>
      </>
  )
};

export default DockerEngineRelease;