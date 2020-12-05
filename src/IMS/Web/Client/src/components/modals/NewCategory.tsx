import React, { useState } from "react";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import CommonAlert from "../CommonAlert";
import {INewCategoryRequest} from "../../models/category";
import {categoriesService} from "../../services/categoriesService";
import {getGlobalError} from "../../shared/helperFunctions";
import {addNewCategory} from "../../store/categoryStore";

interface NewCategoryProps {
  showNewCategory: boolean;
  setShowNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewCategory: React.FC<NewCategoryProps> = ({showNewCategory, setShowNewCategory}) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState<string>("");
  const [inTransaction, setInTransaction] = useState<boolean>(false);
  const [applyError, setApplyError] = useState<boolean>(false);

  const onCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const onSaveClick = async () => {
    if (categoryName.trim() === "")
      return;

    const request: INewCategoryRequest = {
      name: categoryName
    };

    setApplyError(false);
    setInTransaction(true);

    const newCategory = await categoriesService.saveCategory(request);

    setInTransaction(false);

    if (newCategory !== null) {
      dispatch(addNewCategory(newCategory));
      setShowNewCategory(false);
    } else {
      setApplyError(true);
    }
  };

  const formInValid = (): boolean => {
    return categoryName.length < 3;
  };

  const handleClose = () => {
    setShowNewCategory(false);
  };

  return (
    <Modal size="sm" animation={false} show={showNewCategory} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Új kategória</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Form>
            <Form.Group controlId="newCategory">
              <Form.Label>Csoport Neve</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kategória neve..."
                value={categoryName}
                onChange={onCategoryNameChange}
              />
            </Form.Group>
          </Form>

          {applyError && (
            <div className="mt-3">
              <CommonAlert variant="danger" text={getGlobalError() ?? "Hiba mentés közben"} />
            </div>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        {inTransaction && (
          <div className="mr-2">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        <Button
          size="sm"
          disabled={formInValid() || inTransaction}
          onClick={onSaveClick}
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Mentés
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewCategory;
