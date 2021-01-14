import React from 'react';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Extension } from '../../store/types/image/imageTypes';

interface IExtensionsDropdownProps {
  extensions: Extension[];
  handleExtensionChange: (
    e: React.ChangeEvent<{}>,
    extensions: Extension[],
  ) => void;
  id: string;
  name: string;
}

const ExtensionsDropdown = ({
  extensions,
  handleExtensionChange,
  id,
  name,
}: IExtensionsDropdownProps) => {
  const dropDownOptions = extensions.length
    ? extensions.map((extension: Extension) => {
        return {
          id: extension.id,
          name: extension.name,
          special: extension.special,
        };
      })
    : [];

  return (
    <Autocomplete
      style={{ width: 500 }}
      multiple
      id={id}
      disabled={!dropDownOptions.length}
      size="small"
      options={dropDownOptions}
      getOptionLabel={(option) => option.name}
      onChange={handleExtensionChange}
      filterSelectedOptions
      getOptionSelected={(option, selectedOption) => {
        return option.id === selectedOption.id;
      }}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          variant="standard"
          label={!dropDownOptions.length ? `No ${name}` : name}
        />
      )}
    />
  );
};

export default ExtensionsDropdown;
