import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Version } from '../store/types/version/versionTypes';

interface IDockerEngineReleaseProps {
  versionsLoaded: boolean;
  versions: Version[];
  selectedVersion: number | undefined;
  handleVersionChange: (e: React.ChangeEvent<{}>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 360,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const DockerEngineRelease = ({
  versionsLoaded,
  versions,
  selectedVersion,
  handleVersionChange,
}: IDockerEngineReleaseProps) => {
  const classes = useStyles();

  return (
    <div>
      <FormControl size="small" className={classes.formControl} required>
        <InputLabel htmlFor="dockerEngineVersions">
          Docker Engine Version
        </InputLabel>
        <Select
          labelId="dockerEngineVersions"
          id="dockerEngineVersions"
          value={typeof selectedVersion === 'undefined' ? '' : selectedVersion}
          onChange={handleVersionChange}
        >
          {versionsLoaded
            ? versions.map((version: Version) => {
                return (
                  <MenuItem value={version.id} key={version.id}>
                    {version.dockerEngineRelease}
                  </MenuItem>
                );
              })
            : null}
        </Select>
      </FormControl>
      <FormControl size="small" className={classes.formControl} required>
        <InputLabel htmlFor="dockerComposeVersion">
          Docker Compose Version
        </InputLabel>
        <Select
          labelId="dockerComposeVersion"
          id="dockerComposeVersion"
          value={typeof selectedVersion === 'undefined' ? '' : selectedVersion}
          onChange={handleVersionChange}
        >
          {versionsLoaded
            ? versions.map((version: Version) => {
                return (
                  <MenuItem value={version.id} key={version.id}>
                    {version.composeVersion}
                  </MenuItem>
                );
              })
            : null}
        </Select>
      </FormControl>
    </div>
  );
};

export default DockerEngineRelease;
