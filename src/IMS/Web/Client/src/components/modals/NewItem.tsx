import React, { useState } from "react";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import CommonAlert from "../CommonAlert";
import {categoriesService} from "../../services/categoriesService";
import {getGlobalError} from "../../shared/helperFunctions";
import {addItemToCategory} from "../../store/categoryStore";
import {INewItemRequest} from "../../models/item";

interface NewItemProps {
  categoryId: number;
  showNewItem: boolean;
  setShowNewItem: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewItem: React.FC<NewItemProps> = ({categoryId, showNewItem, setShowNewItem}) => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState<string>("");
  const [stockPrice, setStockPrice] = useState<number | null>(null);
  const [sellPrice, setSellPrice] = useState<number | null>(null);
  const [stock, setStock] = useState<number | null>(null);
  const [inTransaction, setInTransaction] = useState<boolean>(false);
  const [applyError, setApplyError] = useState<boolean>(false);

  const onItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  const onStockChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "") {
      setStock(null);
    } else {
      setStock(parseInt(event.target.value, 10));
    }
  };

  const onStockPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "") {
      setStockPrice(null);
    } else {
      setStockPrice(parseInt(event.target.value, 10));
    }
  };

  const onSellPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "") {
      setSellPrice(null);
    } else {
      setSellPrice(parseInt(event.target.value, 10));
    }
  };

  const onSaveClick = async () => {
    if (itemName.trim() === "")
      return;

    if (stock === null || stockPrice === null || sellPrice == null)
      return;

    if (stock < 0 || stockPrice < 0 || sellPrice < 0)
      return;

    const request: INewItemRequest = {
      name: itemName,
      stock: stock,
      stockPrice: stockPrice,
      sellPrice: sellPrice
    };

    setApplyError(false);
    setInTransaction(true);

    const newItem = await categoriesService.saveItem(categoryId, request);

    setInTransaction(false);

    if (newItem !== null) {
      dispatch(addItemToCategory(newItem));
      setShowNewItem(false);
    } else {
      setApplyError(true);
    }
  };

  const formInValid = (): boolean => {
    return itemName.length < 3;
  };

  const handleClose = () => {
    setShowNewItem(false);
  };

  return (
    <Modal size="sm" animation={false} show={showNewItem} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Új áru</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Áru Neve</Form.Label>
              <Form.Control
                type="text"
                placeholder="Áru neve..."
                value={itemName}
                onChange={onItemNameChange}
              />
            </Form.Group>

            <Form.Group controlId="stock">
              <Form.Label>Darabszám</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={stock ?? ""}
                onChange={onStockChange}
              />
            </Form.Group>

            <Form.Group controlId="sellPrice">
              <Form.Label>Eladási Ár</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={sellPrice ?? ""}
                onChange={onSellPriceChange}
              />
            </Form.Group>

            <Form.Group controlId="stockPrice">
              <Form.Label>Raktári Ár</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={stockPrice ?? ""}
                onChange={onStockPriceChange}
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

export default NewItem;
