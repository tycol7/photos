import React, { useEffect, useState } from "react"
import { createApi } from "unsplash-js"
import user_query from "./Query"
import Photo from "./Photo"
import styled from "styled-components"
import Loading from "./loading.svg"
import Modal from "./Modal"

const GridContainer = styled.section`
  column-count: 3;
  width: 95%;
  margin: auto;

  @media only screen and (max-width: 720px) {
    column-count: 2;
  }
`;

const LoadMore = styled.footer`
  margin: 1em auto;
  text-align: center;
  width: 350px;
  margin-bottom: 2em;

  button {
    padding: 15px;
    font-size: 1.2em;
    background: #121D26;
    border: 2px #fff solid;
    border-radius: 30px;
    color: #fff;

    :hover {
      cursor: pointer;
    }

    :disabled {
      cursor: default;
      border: none;
    }
  }
`;

const api = createApi({
  accessKey: "mxtwlN4tcDAJZdza5oMpDxEotmH5Z2zDf1A1i5OPEPc"
});

function Gallery() {
  const [photos, setPhotosResponse] = useState(null);
  const [pages, setPages] = useState(1);
  const [isEmpty, setIsEmpty] = useState("");

  useEffect(() => {
    
    /* Gets more images and appends them to existing images
     * If there are no more images, disable the load more button
     */
    function handlePagesChange(result) {
      if (photos) {
        if (result.response.results === undefined || result.response.results.length === 0) {
          setIsEmpty("That's it!")
        } else {
          setPhotosResponse(photos.concat(result.response.results))
        }
      } else {
        if (result.response.results === undefined || result.response.results.length === 0) {
          setIsEmpty("Sorry, we couldn't find any images with that query")
        }
        setPhotosResponse(result.response.results)
      }
    }

    /* Get photos based on user query */
    if (user_query) {
      api.search
      .getPhotos({ 
        query: user_query, 
        order_by: "latest", 
        perPage: 10, 
        page: pages
      })
      .then(result => {
        handlePagesChange(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
    /* If no user query, load most recent images */
    } else {
      api.photos
      .list({
        perPage: 10,
        page: pages
      })
      .then(result => {
        handlePagesChange(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
    }
  }, [pages]);

  if (photos === null) {
    return <Modal><img src={Loading} alt="Loading" /></Modal>;
  } else {
    return (
      <>
      <GridContainer>
        {photos.map(photo => (
          <Photo photo={photo} key={photo.id} />
        ))}
      </GridContainer>
      <LoadMore>
        {
          isEmpty ? <button disabled>{isEmpty}</button> : <button onClick={() => setPages(pages + 1)}>Load More</button>
        }
      </LoadMore>
      </>
    );
  }
}

export default Gallery;
