import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import { Port } from '../../store/types/image/imageTypes';
import { GeneratePort } from '../../store/types/generate/generateTypes';

interface IPortsProps {
  ports: Port[];
  handlePortChange: (ports: GeneratePort[]) => void;
}

const Ports = ({ ports, handlePortChange }: IPortsProps) => {
  const [portsState, setPortsState] = useState<GeneratePort[]>(
    ports.map((port: GeneratePort) => {
      return { ...port, exposeToHost: false };
    }),
  );

  const handlePortsStateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    portId: number,
    type: string,
  ) => {
    const changedValue =
      type === 'exposeToHost' ? e.target.checked : e.target.value;
    const changedPort: GeneratePort = {
      ...portsState.find((port: GeneratePort) => port.id === portId)!,
      [type]: changedValue,
    };
    const otherPorts: GeneratePort[] = portsState.filter(
      (port: GeneratePort) => port.id !== portId,
    );
    const updatedPorts = (otherPorts.length
      ? [...otherPorts, changedPort]
      : [changedPort]
    ).sort((a: GeneratePort, b: GeneratePort) => a.id - b.id);
    setPortsState(updatedPorts);
    handlePortChange(updatedPorts);
  };

  return (
    <>
      {portsState && portsState.length
        ? portsState.map((port: GeneratePort) => {
            return (
              <div className="image-item-group-row" key={port.id}>
                <FormControl
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%',
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handlePortsStateChange(e, port.id, 'exposeToHost')
                        }
                      />
                    }
                    label="Publish port to host"
                    style={{ justifySelf: 'flex-start' }}
                  />
                  <TextField
                    label="Port exposed to other containers"
                    value={port.outward}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handlePortsStateChange(e, port.id, 'outward')
                    }
                    id={`${port.id}`}
                  />
                  <TextField
                    label="Port exposed to host"
                    value={port.exposeToHost ? port.inward : 'Disabled'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handlePortsStateChange(e, port.id, 'inward')
                    }
                    id={`${port.id}`}
                    disabled={!port.exposeToHost}
                  />
                </FormControl>
              </div>
            );
          })
        : null}
    </>
  );
};

export default Ports;
