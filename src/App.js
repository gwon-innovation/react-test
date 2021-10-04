/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Row,
} from "react-bootstrap";
import shoesData from "./data.js";
import Detail from "./Detail.js";

import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";

function App() {
  let [shoes, shoesChange] = useState(shoesData);
  let [shoesPlus, shoesPlusChange] = useState([]);
  let [loading, loadingChange] = useState(false);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <div className="Jumbotron background">
            <h1>20% Season Off</h1>
            <p>...</p>
            <p></p>
            <Button variant="primary">Primary</Button>
          </div>
          <Container>
            <Row>
              {shoes.map((data, i) => {
                return <ShoesCard shoes={data} i={i} key={i} />;
              })}
            </Row>
            {loading === true ? Loading() : null}
            <button
              className="btn btn-primary"
              onClick={() => {
                loadingChange(true);

                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    loadingChange(false);
                    shoesChange([...shoes, ...result.data]);
                  })
                  .catch(() => {
                    loadingChange(false);
                    alert("서버와의 통신이 실패했어요");
                  });
              }}
            >
              더보기
            </button>
            <Row>
              {shoesPlus.map((data, i) => {
                return <ShoesCard shoes={data} key={i} />;
              })}
            </Row>
          </Container>
        </Route>
        <Route exact path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
        </Route>
        <Route path="/:id">
          <div>아무거나 적었을 때 이거 보여주셈</div>
        </Route>
      </Switch>
    </div>
  );
}

function ShoesCard(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="100%"
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} & {props.shoes.price}
      </p>
    </div>
  );
}

function Loading() {
  return (
    <div>
      <h1>로딩중입니당</h1>
    </div>
  );
}

export default App;
