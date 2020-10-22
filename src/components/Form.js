import React, {useEffect, useState} from "react";
import ImageList from "./ImageList";
import Container from "@material-ui/core/Container";
import {initImages} from "../store/actions/imageActions";
import {CircularProgress} from "@material-ui/core";
import { useDispatch, useSelector} from "react-redux";
import {changeDockerVersion, generate} from "../store/actions/generateActions";
import Button from "@material-ui/core/Button";
import {initVersions} from "../store/actions/versionActions";
import DockerEngineVersion from "./DockerEngineVersion";

const Form = () => {
  const [selectedVersion, setSelectedVersion] = useState(null);

  const imagesLoaded = useSelector(state => state.image.isLoaded);
  const imagesError = useSelector(state => state.image.imagesError);
  const images = useSelector(state => state.image.images);
  const versionsLoaded = useSelector(state => state.version.isLoaded);
  const versionsError = useSelector(state => state.version.versionsError);
  const versions = useSelector(state => state.version.versions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initVersions());
    dispatch(initImages());
  }, [dispatch]);

  const handleVersionChange = (e) => {
    setSelectedVersion(e.target.value);
    dispatch(changeDockerVersion(e.target.value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generate());
  }

  return (
    <Container maxWidth="lg">
      { (!imagesError && imagesLoaded) && (!versionsError && versionsLoaded)
        ?
        <form onSubmit={handleSubmit} className="form">
          <DockerEngineVersion versionsLoaded={versionsLoaded} versions={versions} selectedVersion={selectedVersion} handleVersionChange={handleVersionChange} />
          <ImageList images={images} />
          <Button type="submit" style={{gridArea: "button"}}>Generate</Button>
        </form>
          :
        <>
          {imagesError ? <div>{imagesError.message}</div> : <div><CircularProgress style={{margin: "auto"}}/></div>}
          {versionsError ? <div>{versionsError.message}</div> : <div><CircularProgress style={{margin: "auto"}}/></div>}
          </>
            }
        </Container>
  )

          // {/*<FormControl style={{minWidth: "100%"}} size="small">*/}
          // {/*  <InputLabel htmlFor="versions">Version</InputLabel>*/}
          // {/*  <Select labelId="versions" id="versions" value={selectedVersion ? selectedVersion.id : ''}*/}
          // {/*          onChange={handleVersionChange}>*/}
          // {/*    {versionItems}*/}
          // {/*  </Select>*/}
          // {/*</FormControl>*/}
}

export default Form;