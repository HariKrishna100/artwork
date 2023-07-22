import {React, useState} from "react";
import { Navbar, Nav, Form, Button, Container, NavDropdown } from 'react-bootstrap';
import { useRouter } from "next/router";
import Link from "next/link";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const handleSubmit = (e) => {
            e.preventDefault();
            setIsExpanded(false);
            let queryString = `title=true&q=${searchField}`;
            setSearchHistory((current) => [...current, queryString]);
            router.push(`/artwork?title=true&q=${searchField}`);
    };

    return (
    <>
      <Navbar
            className="fixed-top"
            expand="lg"
            expanded={isExpanded}
            style={{backgroundColor: '#2C3E50'}}
        >
            <Container>
                <Navbar.Brand style={{color: '#F2FCFF'}}>Harikrishna Patel</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" onClick={(e) => setIsExpanded((value) => !value)} />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior>
                            <Nav.Link
                                onClick={(e) =>
                                    isExpanded ? setIsExpanded((value) => !value) : null
                                } active={router.pathname === "/"}
                                style={{color: '#18BC9C'}}
                            > Home </Nav.Link>
                        </Link>
                        <Link href="/search" passHref legacyBehavior>
                            <Nav.Link
                                onClick={(e) =>
                                    isExpanded ? setIsExpanded((value) => !value) : null
                                } active={router.pathname === "/search"}
                                style={{color: '#F2FCFF'}}
                            > Advanced Search </Nav.Link>
                        </Link>
                    </Nav> &nbsp;
                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                            style={{color: '#95A5A6'}}
                        />
                        <Button variant="success" type="submit" style={{background: '#18bc9c', color: '#F2FCFF'}}>Search</Button>
                    </Form> &nbsp;
                    <Nav>
                        <NavDropdown title="User Name" id="basic-nav-dropdown" style={{color: '#F2FCFF'}}>
                            
                            <Link href="/favourites" passHref legacyBehavior>
                                <NavDropdown.Item
                                    onClick={(e) =>
                                        isExpanded ? setIsExpanded((value) => !value) : null
                                    } active={router.pathname === "/favourites"}
                                > Favourites </NavDropdown.Item>
                            </Link>
                            <Link href="/history" passHref legacyBehavior>
                                <NavDropdown.Item
                                    onClick={(e) =>
                                        isExpanded ? setIsExpanded((value) => !value) : null
                                    } active={router.pathname === "/history"}
                                > Search History </NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar><br /><br />
    </>
  );
}