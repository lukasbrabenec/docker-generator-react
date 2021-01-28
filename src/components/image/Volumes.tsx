import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Divider, IconButton, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Delete } from '@material-ui/icons';
import { Volume } from '../../store/types/image/imageTypes';

interface IVolumesProps {
  volumes: Volume[] | undefined;
  handleVolumeChange: (volumes: Volume[]) => void;
  handleAddVolume: () => void;
  handleRemoveVolume: (volumeID: number) => void;
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

const Volumes = ({
  volumes,
  handleVolumeChange,
  handleAddVolume,
  handleRemoveVolume,
}: IVolumesProps): JSX.Element => {
  const handleVolumesStateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    volumeId: number,
    type: string,
  ) => {
    if (volumes !== undefined) {
      let changedVolume = volumes.find(
        (volume: Volume) => volume.id === volumeId,
      );
      if (changedVolume !== undefined) {
        changedVolume = {
          ...changedVolume,
          [type]: e.target.value,
        };
        const otherVolumes: Volume[] = volumes.filter(
          (volume: Volume) => volume.id !== volumeId,
        );
        const updatedVolumes = (otherVolumes.length
          ? [...otherVolumes, changedVolume]
          : [changedVolume]
        ).sort((a: Volume, b: Volume) => a.id - b.id);
        handleVolumeChange(updatedVolumes);
      }
    }
  };

  const classes = useStyles();
  return (
    <>
      {volumes && volumes.length
        ? volumes.map((volume: Volume) => {
            return (
              <React.Fragment key={volume.id}>
                <FormControl className={classes.row}>
                  <TextField
                    label="Container path"
                    value={volume.containerPath}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleVolumesStateChange(e, volume.id, 'containerPath')
                    }
                    id={`${volume.id}-containerPath`}
                    error={volume.containerPath === ''}
                    helperText={
                      volume.containerPath === ''
                        ? 'Path cannot be empty'
                        : null
                    }
                    required={volume.containerPath === ''}
                  />
                  <TextField
                    label="Host path"
                    value={volume.hostPath}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleVolumesStateChange(e, volume.id, 'hostPath')
                    }
                    id={`${volume.id}-hostPath`}
                    error={volume.hostPath === ''}
                    helperText={
                      volume.hostPath === '' ? 'Path cannot be empty' : null
                    }
                    required={volume.hostPath === ''}
                  />
                  <Tooltip title="Remove Volume">
                    <IconButton onClick={() => handleRemoveVolume(volume.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </FormControl>
                <Divider light />
              </React.Fragment>
            );
          })
        : null}
      <Button
        variant="outlined"
        style={{ width: '30%', alignSelf: 'center' }}
        onClick={handleAddVolume}
      >
        Add Volume
      </Button>
    </>
  );
};

export default Volumes;
