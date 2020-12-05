import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { authService } from "../services/authService";
import { setUser } from "../store/userStore";
import CommonAlert from "./CommonAlert";

enum inputType {
  USERNAME,
  PASSWORD,
}

const Signin: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inTransaction, setInTransaction] = useState<boolean>(false);
  const [signinError, setSigninError] = useState<boolean>(false);

  const onFormControlChange = (type: inputType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (type) {
      case inputType.USERNAME:
        setUserName(event.target.value);
        break;
      case inputType.PASSWORD:
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const onSigninClick = async () => {
    setInTransaction(true);
    const user = await authService.signin(userName, password);
    setInTransaction(false);

    if (user) {
      dispatch(setUser(user));
      user.roles.includes("MANAGER")
        ? history.push("stockManager")
        : history.push("supplies");
    } else {
      setSigninError(true);
    }
  };

  const onSignupClick = () => {
    history.push("signup");
  };
  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Row>
            <Col>
              <h1>Bejelentkezés</h1>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Form>
                <Form.Group controlId="username">
                  <Form.Label>Felhasználónév</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Pl.: kovacs88"
                    value={userName}
                    onChange={onFormControlChange(inputType.USERNAME)}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Jelszó</Form.Label>
                  <Form.Control
                    size="sm"
                    type="password"
                    placeholder="Jelszó"
                    value={password}
                    onChange={onFormControlChange(inputType.PASSWORD)}
                  />
                </Form.Group>
                <Row className="mt-2">
                  <Col>
                    <Button
                      size="sm"
                      onClick={onSigninClick}
                      disabled={inTransaction}
                    >
                      Bejelentkezés
                    </Button>
                    {inTransaction && (
                      <Spinner
                        as="span"
                        animation="border"
                        variant="primary"
                        size="sm"
                        className="ml-2"
                      />
                    )}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>Nincs még felhasználói fiókja?</Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={onSignupClick}
                    >
                      Regisztráció
                      <FontAwesomeIcon
                        icon={faArrowCircleRight}
                        className="ml-2"
                      />
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          {signinError && (
            <Row className="mt-2">
              <Col>
                <CommonAlert
                  variant="danger"
                  text="Hiba a bejelentkezés közben"
                />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
