import React, { useState } from "react";
import { Button, Container, Modal, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import CommonAlert from "../CommonAlert";
import {getGlobalError} from "../../shared/helperFunctions";
import {deleteItemFromCategory} from "../../store/categoryStore";
import {itemsService} from "../../services/itemService";
import {IItemResponse} from "../../models/item";

interface DeleteItemProps {
  item: IItemResponse;
  showDeleteItem: boolean;
  setShowDeleteItem: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteItem: React.FC<DeleteItemProps> = ({item,showDeleteItem, setShowDeleteItem}) => {
  const dispatch = useDispatch();
  const [inTransaction, setInTransaction] = useState<boolean>(false);
  const [applyError, setApplyError] = useState<boolean>(false);

  const onDeleteClick = async () => {
    setApplyError(false);
    setInTransaction(true);

    const success = await itemsService.deleteItem(item.id);

    setInTransaction(false);

    if (success) {
      dispatch(deleteItemFromCategory(item));
      setShowDeleteItem(false);
    } else {
      setApplyError(true);
    }
  };

  const handleClose = () => {
    setShowDeleteItem(false);
  };

  return (
    <Modal size="sm" animation={false} show={showDeleteItem} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Áru Törlése</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>

          Biztos benne?

          {applyError && (
            <div className="mt-3">
              <CommonAlert variant="danger" text={getGlobalError() ?? "Hiba törlés közben"} />
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
          onClick={onDeleteClick}
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Törlés
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteItem;
