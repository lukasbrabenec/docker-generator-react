import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Volume } from '../../store/types/image/imageTypes';

interface IVolumesProps {
  volumes: Volume[];
  handleVolumeChange: (volumes: Volume[]) => void;
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

const Volumes = ({ volumes, handleVolumeChange }: IVolumesProps) => {
  const handleVolumesStateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    volumeId: number,
    type: string,
  ) => {
    const changedValue = type === 'active' ? e.target.checked : e.target.value;
    const changedVolume: Volume = {
      ...volumes.find((volume: Volume) => volume.id === volumeId)!,
      [type]: changedValue,
    };
    const otherVolumes: Volume[] = volumes.filter(
      (volume: Volume) => volume.id !== volumeId,
    );
    const updatedVolumes = (otherVolumes.length
      ? [...otherVolumes, changedVolume]
      : [changedVolume]
    ).sort((a: Volume, b: Volume) => a.id - b.id);
    handleVolumeChange(updatedVolumes);
  };

  const classes = useStyles();
  return (
    <>
      {volumes && volumes.length
        ? volumes.map((volume: Volume, i: number) => {
            return (
              <React.Fragment key={`${volume.id}-volume`}>
                <FormControl className={classes.row}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleVolumesStateChange(e, volume.id, 'active')
                        }
                        checked={volume.active}
                      />
                    }
                    label="Active"
                  />
                  <TextField
                    label="Container path"
                    value={volume.containerPath}
                    id={`${volume.id}-containerPath`}
                    disabled
                  />
                  <TextField
                    label="Host path"
                    value={volume.hostPath}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleVolumesStateChange(e, volume.id, 'hostPath')
                    }
                    id={`${volume.id}-hostPath`}
                    disabled={!volume.active}
                  />
                </FormControl>
                {i !== volumes.length - 1 ? <Divider light /> : null}
              </React.Fragment>
            );
          })
        : null}
    </>
  );
};

export default Volumes;
