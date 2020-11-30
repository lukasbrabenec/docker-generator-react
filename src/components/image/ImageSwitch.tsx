import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import { Image } from '../../store/types/image/imageTypes';

interface IImageSwitchProps {
  image: Image;
  handleCheckImage: () => void;
}

const ImageSwitch = ({ image, handleCheckImage }: IImageSwitchProps) => {
  return (
    <FormControlLabel
      control={<Switch value={image.id} onChange={handleCheckImage} />}
      label={image.name}
    />
  );
};

export default ImageSwitch;
