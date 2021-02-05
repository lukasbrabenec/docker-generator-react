import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Divider, IconButton, InputAdornment, TextField, Tooltip } from '@material-ui/core';
import { CheckCircleOutline, Delete, RadioButtonUnchecked } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { Port } from '../../store/types/image/imageTypes';

interface IPortsProps {
  ports: Port[] | undefined;
  handlePortChange: (ports: Port[]) => void;
  handleAddPort: () => void;
  handleRemovePort: (portID: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      gap: '20px',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        gap: '5px',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
  }),
);

const Ports = ({
  ports,
  handlePortChange,
  handleAddPort,
  handleRemovePort,
}: IPortsProps): JSX.Element => {
  const handlePortsStateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    portID: number,
    type: string,
  ) => {
    if (ports !== undefined) {
      const changedValue = !Number.isNaN(parseInt(e.target.value, 10))
        ? parseInt(e.target.value, 10)
        : '';
      let changedPort = ports.find((port: Port) => port.id === portID);
      if (changedPort !== undefined) {
        changedPort = {
          ...changedPort,
          [type]: changedValue,
        };
        const otherPorts: Port[] = ports.filter((port: Port) => port.id !== portID);
        const updatedPorts: Port[] = (otherPorts.length
          ? [...otherPorts, changedPort]
          : [changedPort]
        ).sort((a: Port, b: Port) => a.id - b.id);
        if (!Number.isNaN(changedValue)) {
          handlePortChange(updatedPorts);
        }
      }
    }
  };

  const handleActiveStateChange = (type: string, portID: number) => {
    if (ports !== undefined) {
      const changedPort = ports.find((port: Port) => port.id === portID);
      if (changedPort !== undefined) {
        if (type === 'exposedToContainers') {
          // disabling exposedToContainers while exposedToHost is active is not allowed
          if (changedPort.exposedToHost === true && changedPort.exposedToContainers === true)
            return;
          changedPort.exposedToContainers = !changedPort.exposedToContainers;
        }
        if (type === 'exposedToHost') {
          changedPort.exposedToHost = !changedPort.exposedToHost;
          changedPort.exposedToContainers = true;
        }
        const otherPorts: Port[] = ports.filter((port: Port) => port.id !== portID);
        const updatedPorts: Port[] = (otherPorts.length
          ? [...otherPorts, changedPort]
          : [changedPort]
        ).sort((a: Port, b: Port) => a.id - b.id);
        handlePortChange(updatedPorts);
      }
    }
  };

  const classes = useStyles();
  return (
    <>
      {ports && ports.length
        ? ports.map((port: Port) => (
            <React.Fragment key={port.id}>
              <div className={classes.row}>
                <FormControl>
                  <TextField
                    label="Other containers"
                    id={`${port.id}-outward`}
                    type="text"
                    value={port.exposedToContainers ? port.outward : 'Disabled'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handlePortsStateChange(e, port.id, 'outward')
                    }
                    disabled={!port.exposedToContainers}
                    error={port.exposedToContainers && port.outward === ''}
                    helperText={
                      port.exposedToContainers && port.outward === ''
                        ? 'Only numbers are allowed'
                        : null
                    }
                    required={port.exposedToContainers && port.outward === ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title={
                              !port.exposedToContainers ? 'Expose to Other Containers' : 'Disable'
                            }
                          >
                            <IconButton
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() =>
                                handleActiveStateChange('exposedToContainers', port.id)
                              }
                            >
                              {port.exposedToContainers ? (
                                <CheckCircleOutline />
                              ) : (
                                <RadioButtonUnchecked />
                              )}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    label="Host"
                    id={`${port.id}-inward`}
                    type="text"
                    value={port.exposedToHost ? port.inward : 'Disabled'}
                    disabled={!port.exposedToHost}
                    error={port.exposedToHost && port.inward === ''}
                    helperText={
                      port.exposedToHost && port.inward === '' ? 'Only numbers are allowed' : null
                    }
                    required={port.exposedToHost && port.inward === ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handlePortsStateChange(e, port.id, 'inward')
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={!port.exposedToHost ? 'Expose to Host' : 'Disable'}>
                            <IconButton
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => handleActiveStateChange('exposedToHost', port.id)}
                            >
                              {port.exposedToHost ? (
                                <CheckCircleOutline />
                              ) : (
                                <RadioButtonUnchecked />
                              )}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <Tooltip title="Remove Ports">
                  <IconButton
                    onClick={() => handleRemovePort(port.id)}
                    edge="end"
                    style={{ maxHeight: '50px' }}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
              <Divider light />
            </React.Fragment>
          ))
        : null}
      <Button
        variant="outlined"
        style={{ width: '30%', alignSelf: 'center' }}
        onClick={handleAddPort}
      >
        Add Port
      </Button>
    </>
  );
};

export default Ports;
