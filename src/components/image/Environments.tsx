import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Environment } from '../../store/types/image/imageTypes';

interface IEnvironmentsProps {
  environments: Environment[];
  handleEnvironmentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Environments = ({
  environments,
  handleEnvironmentChange,
}: IEnvironmentsProps) => {
  const environmentList = environments.map((environment: Environment) => {
    return (
      <TextField
        required={environment.required && !environment.hidden}
        disabled={environment.hidden}
        label={environment.code}
        key={environment.id}
        onChange={handleEnvironmentChange}
        id={`${environment.id}`}
        style={{ minWidth: '80%' }}
      />
    );
  });

  return <div>{environmentList}</div>;
};

export default Environments;
