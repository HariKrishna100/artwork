import {React, useState} from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useRouter } from "next/router";

function NavScrollExample() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const updateSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchText);
    if (searchText.trim() != "") {
      router.push(`/artwork?title=true&q=${searchText}`);
    }
    setSearchText("");
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>Harikrishna Patel</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="/" passHref legacyBehavior>
                Home
              </Nav.Link>
              <Nav.Link href="/search" passHref legacyBehavior>
                Advanced Search
              </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={updateSearchText}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br /><br />
    </>
  );
}

export default NavScrollExample;
