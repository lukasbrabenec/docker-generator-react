import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { GetApp } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import ImageList from './ImageList';
import {
  changeDockerVersion,
  changeProjectName,
  generate,
} from '../store/actions/generateActions';
import { initImages, initRestartTypes } from '../store/actions/imageActions';
import { initVersions } from '../store/actions/versionActions';
import DockerEngineVersion from './DockerEngineVersion';
import { RootState } from '../store/types/root/rootState';

const Form = () => {
  const [selectedVersion, setSelectedVersion] = useState<number | undefined>(
    undefined,
  );
  const [projectName, setProjectName] = useState<string>('');

  const imagesLoaded = useSelector((state: RootState) => state.image.isLoaded);
  const imagesError = useSelector((state: RootState) => state.image.error);
  const images = useSelector((state: RootState) => state.image.images);
  const versionsLoaded = useSelector(
    (state: RootState) => state.version.isLoaded,
  );
  const versionsError = useSelector(
    (state: RootState) => state.version.versionsError,
  );
  const versions = useSelector((state: RootState) => state.version.versions);
  const restartTypes = useSelector(
    (state: RootState) => state.image.restartTypes,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initVersions());
    dispatch(initImages());
    dispatch(initRestartTypes());
  }, [dispatch]);

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
    dispatch(changeProjectName(e.target.value));
  };

  const handleVersionChange = (e: React.ChangeEvent<{}>) => {
    const target = e.target as HTMLSelectElement;
    setSelectedVersion(parseInt(target.value, 10));
    dispatch(changeDockerVersion(parseInt(target.value, 10)));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(generate());
  };

  return (
    <Container maxWidth="lg">
      {imagesLoaded && versionsLoaded ? (
        <form onSubmit={handleSubmit} className="form">
          <TextField
            className="general-option"
            label="Project Name"
            value={projectName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleProjectNameChange(e)
            }
            required
          />
          <DockerEngineVersion
            versionsLoaded={versionsLoaded}
            versions={versions}
            selectedVersion={selectedVersion}
            handleVersionChange={handleVersionChange}
          />
          <ImageList images={images} restartTypes={restartTypes} />
          <Button
            type="submit"
            variant="contained"
            color="default"
            startIcon={<GetApp />}
            style={{ alignSelf: 'center' }}
          >
            Generate
          </Button>
        </form>
      ) : (
        <>
          {!imagesError || versionsError ? (
            <CircularProgress style={{ margin: 'auto' }} />
          ) : (
            <>
              {typeof imagesError === 'string' ? (
                <Alert severity="error">{imagesError}</Alert>
              ) : null}
              {typeof versionsError === 'string' ? (
                <Alert severity="error">{versionsError}</Alert>
              ) : null}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Form;
