import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import React from 'react';
import { ImageVersion } from '../../store/types/image/imageTypes';

interface IImageVersionSelectProps {
  imageVersions: ImageVersion[];
  selectedVersion: ImageVersion | undefined;
  handleVersionChange: (e: React.ChangeEvent<{}>) => void;
}

const ImageVersionSelect = ({
  imageVersions,
  selectedVersion,
  handleVersionChange,
}: IImageVersionSelectProps): JSX.Element => {
  const versionItems = imageVersions.length
    ? imageVersions.map((imageVersion: ImageVersion) => {
        return (
          <MenuItem value={imageVersion.id} key={imageVersion.id}>
            {imageVersion.version}
          </MenuItem>
        );
      })
    : null;

  return versionItems ? (
    <FormControl style={{ width: '50%' }} size="small" required>
      <InputLabel htmlFor="versions">Version</InputLabel>
      <Select
        labelId="versions"
        id="versions"
        value={selectedVersion ? selectedVersion.id : ''}
        onChange={handleVersionChange}
      >
        {versionItems}
      </Select>
    </FormControl>
  ) : (
    <p>no versions</p>
  );
};

export default ImageVersionSelect;
