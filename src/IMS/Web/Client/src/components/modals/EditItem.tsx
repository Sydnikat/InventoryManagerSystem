import React, { useState } from "react";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import CommonAlert from "../CommonAlert";
import {getGlobalError} from "../../shared/helperFunctions";
import {changeItemInCategory} from "../../store/categoryStore";
import {IItemResponse, IItemUpdateRequest} from "../../models/item";
import {itemsService} from "../../services/itemService";

interface NewItemProps {
  item: IItemResponse;
  showEditItem: boolean;
  setShowEditItem: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditItem: React.FC<NewItemProps> = ({item, showEditItem, setShowEditItem}) => {
  const dispatch = useDispatch();
  const [stockPrice, setStockPrice] = useState<number | null>(item.stockPrice);
  const [sellPrice, setSellPrice] = useState<number | null>(item.sellPrice);
  const [stock, setStock] = useState<number | null>(item.stock);
  const [inTransaction, setInTransaction] = useState<boolean>(false);
  const [applyError, setApplyError] = useState<boolean>(false);

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
    if (stock === null || stockPrice === null || sellPrice == null)
      return;

    if (stock < 0 || stockPrice < 0 || sellPrice < 0)
      return;

    const request: IItemUpdateRequest = {
      stock: stock,
      stockPrice: stockPrice,
      sellPrice: sellPrice
    };

    setApplyError(false);
    setInTransaction(true);

    const newItem = await itemsService.saveItem(item.id, request);

    setInTransaction(false);

    if (newItem !== null) {
      dispatch(changeItemInCategory(newItem));
      setShowEditItem(false);
    } else {
      setApplyError(true);
    }
  };

  const handleClose = () => {
    setShowEditItem(false);
  };

  return (
    <Modal size="sm" animation={false} show={showEditItem} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Áru Módosítása</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Form>
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
          disabled={inTransaction}
          onClick={onSaveClick}
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Mentés
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditItem;
