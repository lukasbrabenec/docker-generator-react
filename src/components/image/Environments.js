import React from "react";
import TextField from "@material-ui/core/TextField";

const Environments = ({environments, handleEnvironmentChange}) => {
  const environmentList = environments.map(environment => {
    return (
      <TextField
        required={environment.required && !environment.hidden}
        disabled={environment.hidden}
        label={environment.code}
        key={environment.id}
        onChange={handleEnvironmentChange}
        id={environment.id + ''}
        style={{minWidth: "100%"}}
      />
    )
  });

  return (
    <div>
      {environmentList}
    </div>
  );
}

export default Environments;