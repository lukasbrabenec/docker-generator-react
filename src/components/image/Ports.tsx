import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Divider,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import { CheckCircleOutline, RadioButtonUnchecked } from '@material-ui/icons';
import { Port } from '../../store/types/image/imageTypes';

interface IPortsProps {
  ports: Port[];
  handlePortChange: (ports: Port[]) => void;
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

const Ports = ({ ports, handlePortChange }: IPortsProps) => {
  const handlePortsStateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    portID: number,
    type: string,
  ) => {
    const changedValue = parseInt(e.target.value, 10);
    if (!Number.isNaN(changedValue)) {
      const changedPort: Port = {
        ...ports.find((port: Port) => port.id === portID)!,
        [type]: changedValue,
      };
      const otherPorts: Port[] = ports.filter(
        (port: Port) => port.id !== portID,
      );
      const updatedPorts: Port[] = (otherPorts.length
        ? [...otherPorts, changedPort]
        : [changedPort]
      ).sort((a: Port, b: Port) => a.id - b.id);
      handlePortChange(updatedPorts);
    }
  };

  const handleActiveStateChange = (type: string, portID: number) => {
    const changedPort = ports.find((port: Port) => port.id === portID);
    if (changedPort !== undefined) {
      if (type === 'exposedToContainers') {
        changedPort.exposedToContainers = !changedPort.exposedToContainers;
      }
      if (type === 'exposedToHost') {
        changedPort.exposedToHost = !changedPort.exposedToHost;
      }
      const otherPorts: Port[] = ports.filter(
        (port: Port) => port.id !== portID,
      );
      const updatedPorts: Port[] = (otherPorts.length
        ? [...otherPorts, changedPort]
        : [changedPort]
      ).sort((a: Port, b: Port) => a.id - b.id);
      handlePortChange(updatedPorts);
    }
  };

  const classes = useStyles();
  return (
    <>
      {ports && ports.length
        ? ports.map((port: Port, i: number) => {
            return (
              <React.Fragment key={`${port.id}-port`}>
                <div className={classes.row}>
                  <FormControl>
                    <InputLabel>For other containers</InputLabel>
                    <Input
                      id={`${port.id}-outward`}
                      type="text"
                      value={
                        port.exposedToContainers ? port.outward : 'Disabled'
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handlePortsStateChange(e, port.id, 'outward')
                      }
                      disabled={!port.exposedToContainers}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() =>
                              handleActiveStateChange(
                                'exposedToContainers',
                                port.id,
                              )
                            }
                          >
                            {port.exposedToContainers ? (
                              <CheckCircleOutline />
                            ) : (
                              <RadioButtonUnchecked />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel>For host</InputLabel>
                    <Input
                      id={`${port.id}-inward`}
                      type="text"
                      value={port.exposedToHost ? port.inward : 'Disabled'}
                      disabled={!port.exposedToHost}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handlePortsStateChange(e, port.id, 'inward')
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() =>
                              handleActiveStateChange('exposedToHost', port.id)
                            }
                          >
                            {port.exposedToHost ? (
                              <CheckCircleOutline />
                            ) : (
                              <RadioButtonUnchecked />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                {i !== ports.length - 1 ? <Divider light /> : null}
              </React.Fragment>
            );
          })
        : null}
    </>
  );
};

export default Ports;
