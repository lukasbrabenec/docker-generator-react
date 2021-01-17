import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import { Volume } from '../../store/types/image/imageTypes';
import { GenerateVolume } from '../../store/types/generate/generateTypes';

interface IVolumesProps {
  volumes: Volume[];
  handleVolumeChange: (volumes: GenerateVolume[]) => void;
}

const Volumes = ({ volumes, handleVolumeChange }: IVolumesProps) => {
  const [volumesState, setVolumesState] = useState<GenerateVolume[]>(
    volumes.map((volume: GenerateVolume) => {
      return { ...volume, active: true };
    }),
  );

  useEffect(() => {
    handleVolumeChange(volumesState);
  });

  const handleVolumesStateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    volumeId: number,
    type: string,
  ) => {
    const changedValue = type === 'active' ? e.target.checked : e.target.value;
    const changedVolume: GenerateVolume = {
      ...volumesState.find((volume: GenerateVolume) => volume.id === volumeId)!,
      [type]: changedValue,
    };
    const otherVolumes: GenerateVolume[] = volumesState.filter(
      (volume: GenerateVolume) => volume.id !== volumeId,
    );
    const updatedVolumes = (otherVolumes.length
      ? [...otherVolumes, changedVolume]
      : [changedVolume]
    ).sort((a: GenerateVolume, b: GenerateVolume) => a.id - b.id);
    setVolumesState(updatedVolumes);
    handleVolumeChange(updatedVolumes);
  };

  return (
    <>
      {volumesState && volumesState.length
        ? volumesState.map((volume: GenerateVolume) => {
            return (
              <div className="image-item-group-row" key={volume.id}>
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
              </div>
            );
          })
        : null}
    </>
  );
};

export default Volumes;
