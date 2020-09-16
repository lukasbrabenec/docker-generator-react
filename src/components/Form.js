import React, {useEffect} from "react";
import ImageList from "./image/ImageList";
import Container from "@material-ui/core/Container";
import {initImages} from "../store/actions/imageActions";
import {CircularProgress} from "@material-ui/core";
import { useDispatch, useSelector} from "react-redux";
import {generate} from "../store/actions/generateActions";
import Button from "@material-ui/core/Button";

const Form = () => {
  const isLoaded = useSelector(state => state.image.isLoaded);
  const imagesError = useSelector(state => state.image.imagesError);
  const images = useSelector(state => state.image.images);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initImages());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generate());
  }

  return (
    <Container maxWidth="lg">
      { isLoaded && !imagesError
        ?
        <form onSubmit={handleSubmit}>
          <ImageList
            images={images}
          />
          <Button type="submit">Generate</Button>
        </form>
        :
        imagesError ?
          <p>{imagesError.message}</p>
          : <CircularProgress style={{margin: "auto"}}/>}
    </Container>
  );
}

export default Form;