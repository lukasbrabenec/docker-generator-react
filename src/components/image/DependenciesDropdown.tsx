import React from 'react';
import Autocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Image } from '../../store/types/image/imageTypes';

interface IExtensionsDropdownProps {
  currentImage: Image;
  selectedImages: Image[];
  handleDependenciesChange: (e: React.ChangeEvent<{}>, images: Image[]) => void;
}

const DependenciesDropDown = ({
  currentImage,
  selectedImages,
  handleDependenciesChange,
}: IExtensionsDropdownProps): JSX.Element => {
  // filter self and other images that already have dependency on this image
  const filteredImages = selectedImages.filter(
    (image: Image) =>
      image.id !== currentImage.id &&
      !(
        currentImage.dependencies &&
        currentImage.dependencies.find((dependentImage: Image) => dependentImage.id === image.id)
      ),
  );

  return (
    <Autocomplete
      style={{ minWidth: '60%' }}
      multiple
      disabled={!filteredImages.length}
      size="small"
      options={filteredImages}
      getOptionLabel={(option) => option.name}
      onChange={handleDependenciesChange}
      filterSelectedOptions
      getOptionSelected={(option, selectedOption) => option.id === selectedOption.id}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          variant="standard"
          label={!filteredImages.length ? `No dependency available` : 'Depends on'}
        />
      )}
    />
  );
};

export default DependenciesDropDown;
