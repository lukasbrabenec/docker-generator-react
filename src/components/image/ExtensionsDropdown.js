import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const ExtensionsDropdown = ({extensions, handleExtensionChange, id, name}) => {
  const dropDownOptions = extensions.length ? extensions.map(extension => {
    return {
      id: extension.extension.id,
      name: extension.extension.name
    }
  }) : [];

  return (
    <Autocomplete style={{minWidth: "100%"}}
                  multiple
                  id={id}
                  disabled={!dropDownOptions.length}
                  size="small"
                  options={dropDownOptions}
                  getOptionLabel={(option => option.name)}
                  onChange={handleExtensionChange}
                  filterSelectedOptions
                  getOptionSelected={(option, selectedOption) => option.id === selectedOption.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={!dropDownOptions.length ? `No ${name}` : name}
                    />
                  )}
    />
  );
}

export default ExtensionsDropdown;