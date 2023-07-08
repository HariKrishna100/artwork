import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Error from "next/error";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import ArtworkCard from "@/components/ArtworkCard";

const PER_PAGE = 12;

export default function ArtHome() {
  const router = useRouter();
  let [artworkList, setArtworkList] = useState(null);
  let [page, setPage] = useState(1);
  let finalQuery = router.asPath.split("?")[1];
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  useEffect(() => {
    console.log("Artwork List:", artworkList);
  }, [artworkList]);

  useEffect(() => {
    if (data != null && data != undefined) {
      let results = [];
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  // Throw an error if the API request fails
  if (error) {
    return <Error statusCode={404} />;
  } else {
    if (!artworkList) {
      return null;
    }
  }

  const nextPage = () => page < artworkList.length && setPage(++page);

  const previousPage = () => page > 1 && setPage(--page);

  return (
    <>
      <Container>
        {artworkList.length > 0 ? (
          <>
            <Row className="gy-4">
              {artworkList[page - 1].map((currentObjectID) => (
                <Col lg={3} key={currentObjectID}>
                  <ArtworkCard objectID={currentObjectID} />
                </Col>
              ))}
            </Row>
            <Row>
              <Col>
                <br />
                <br />
                <Pagination>
                  <Pagination.Prev onClick={previousPage} />
                  <Pagination.Item>{page}</Pagination.Item>
                  <Pagination.Next onClick={nextPage} />
                </Pagination>
              </Col>
            </Row>
          </>
        ) : (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              <p>Try searching for something else.</p>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
