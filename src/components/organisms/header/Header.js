import { Navbar, Container, Nav } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">Admin UI</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#home">About Us</Nav.Link>
          <Nav.Link href="#home">Contact Us</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
