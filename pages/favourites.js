import React from "react";
import Error from "next/error";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from '@/components/ArtworkCard';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if (favouritesList) {
      if (favouritesList?.length == 0) {
        return (
          <>
            <Row className="gy-4">
              <Card>
                <Card.Body>
                  <h4>Nothing Here</h4>
                  <br />
                  Try adding some new artwork to the list.
                </Card.Body>
              </Card>
            </Row>
          </>
        );
      } else {
        return (
          <>
            <Row className="gy-4">
              {favouritesList?.map((currentObjectID, index) => (
                <Col lg={3} key={currentObjectID}>
                  <ArtworkCard objectID={currentObjectID} />
                </Col>
              ))}
            </Row>
          </>
        );
      }
    } else {
      return (
        <>
          <Error statusCode={404} />
        </>
      );
    }
}