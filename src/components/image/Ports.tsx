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
              <div className="image-item-group-row">
                <FormControl style={{ flexDirection: 'row', gap: 10 }}>
                  <FormControlLabel
                    key={port.id}
                    className="port-item"
                    control={
                      <Checkbox
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handlePortsStateChange(e, port.id, 'exposeToHost')
                        }
                      />
                    }
                    label="Publish port to host"
                    style={{ gridArea: 'port-switch' }}
                  />
                  <TextField
                    className="port-item"
                    label="Port exposed to other containers"
                    value={port.outward}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handlePortsStateChange(e, port.id, 'outward')
                    }
                    id={`${port.id}`}
                    style={{ gridArea: 'port-outward' }}
                  />
                  {port.exposeToHost ? (
                    <TextField
                      className="port-item"
                      label="Port exposed to host"
                      value={port.inward}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handlePortsStateChange(e, port.id, 'inward')
                      }
                      id={`${port.id}`}
                      style={{ gridArea: 'port-inward' }}
                    />
                  ) : null}
                </FormControl>
              </div>
            );
          })
        : null}
    </>
  );
};

export default Ports;
