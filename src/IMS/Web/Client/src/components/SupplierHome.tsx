import React, {Fragment, useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userStore";
import {useCategoriesForSupplier} from "../shared/hooks";
import { setCategories } from "../store/categoryStore";
import { RootState } from "../store/rootReducer";
import {ICategoryResponse} from "../models/category";
import {IItemResponse} from "../models/item";
import {supplyService} from "../services/supplyService";
import {ICategoryItemStockRequest, IStockChangedRequest} from "../models/stock";
import {changeItemInCategory} from "../store/categoryStore";
import {store} from "../store/store";

export interface IItem {
  id: number;
  name: string;
  categoryId: number;
  stockPrice: number | null;
  sellPrice: number;
  stock: number | null;
}

interface IModifiedItem {
  item: IItem;
  modified: boolean;
}

const SupplierHome: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categoryReducer.categories);
  const { categories: fetchedCategories, categoriesLoading } = useCategoriesForSupplier();
  const [modifiedItems, setModifiedItems] = useState<IModifiedItem[]>([]);
  const [originalItems, setOriginalItems] = useState<IItemResponse[]>([]);
  const [inTransaction, setInTransaction] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setCategories(fetchedCategories));
  }, [fetchedCategories, dispatch]);

  useEffect(() => {
    const modified: IModifiedItem[] = [];
    const original: IItemResponse[] = [];
    categories.forEach(c => {
      c.items.forEach(i => {
        modified.push({item: i, modified: false});
        original.push(i);
      });
    });
    setModifiedItems(modified);
    setOriginalItems(original);
  }, [categories]);

  const onSignout = () => {
    dispatch(setUser(undefined));
    dispatch(setCategories([]));
  };

  const onStockChange = (changed: IModifiedItem) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const foundItem = modifiedItems.find(i => i.item.id === changed.item.id);

    if (foundItem === undefined)
      return;

    let stock;

    if (event.target.value !== "") {
      stock = parseInt(event.target.value, 10)
    } else
      stock = null;

    const changedItem: IModifiedItem = {item: {...foundItem.item, stock}, modified: true};

    const list: IModifiedItem[] = [];
    modifiedItems.forEach(i => {
      if (i.item.id !== foundItem.item.id) {
        list.push(i);
      } else {
        list.push(changedItem);
      }
    });
    setModifiedItems(list);
  };

  const onStockPriceChange = (changed: IModifiedItem) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const foundItem = modifiedItems.find(i => i.item.id === changed.item.id);

    if (foundItem === undefined)
      return;

    let stockPrice;

    if (event.target.value !== "") {
      stockPrice = parseInt(event.target.value, 10)
    } else
      stockPrice = null;

    const changedItem: IModifiedItem = {item: {...foundItem.item, stockPrice}, modified: true};

    const list: IModifiedItem[] = [];
    modifiedItems.forEach(i => {
      if (i.item.id !== foundItem.item.id) {
        list.push(i);
      } else {
        list.push(changedItem);
      }
    });
    setModifiedItems(list);
  };

  const onSaveClick = async () => {
    const changedItems = modifiedItems
      .filter(m => m.modified)
      .filter(m => {
        const original = originalItems.find(item => item.id === m.item.id);
        if (original === undefined)
          return false;

        if (m.item.stock === null || m.item.stockPrice === null)
          return false;

        if (m.item.stock < 0 || m.item.stockPrice < 0)
          return false;

        return !(original.stock === m.item.stock && original.stockPrice === m.item.stockPrice);
      });

    if (changedItems.length === 0)
      return;

    const user = store.getState().userReducer.user;
    if (user === undefined)
      return;

    const request: IStockChangedRequest = {
      userId: user.id,
      items: changedItems.map(i => {
        return {
          itemId: i.item.id,
          stockPrice: i.item.stockPrice,
          stock: i.item.stock,
        } as ICategoryItemStockRequest
      })
    }

    setInTransaction(true);

    const success = await supplyService.changeStock(request);

    if (success) {
      changedItems.forEach(i => {
        const original = originalItems.find(item => item.id === i.item.id);
        if (original !== undefined) {
          const stock = i.item.stock ?? original.stock;
          const stockPrice = i.item.stockPrice ?? original.stockPrice;
          dispatch(changeItemInCategory({ ...original, stock, stockPrice}))
        }
      })
      setInTransaction(false);
    } else {
      setInTransaction(false);
    }
  };

  return (
    <div>
      <Container fluid className="mt-2 mb-2">
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Row className="mb-3">

              <Button size="sm" variant="info" className="mr-2" disabled={inTransaction} onClick={onSaveClick}>
                <FontAwesomeIcon icon={faSave} className="mr-2"/>
                Módosít
              </Button>

              <Button
                variant="secondary"
                size="sm"
                className="ml-auto"
                onClick={onSignout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Kijelentkezés
              </Button>
            </Row>
            {categoriesLoading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <Table bordered>
                <thead>
                <tr>
                  <td style={colStyle.name}>Név</td>
                  <td style={colStyle.stock}>Darabszám</td>
                  <td style={colStyle.stockPrice}>Raktári Ár</td>
                  <td style={colStyle.sellPrice} className="text-right" >Eladási Ár</td>
                </tr>
                </thead>
                <tbody>
                {categories.map((category: ICategoryResponse) => (
                  <Fragment key={category.id}>
                  <tr className="alert-secondary">
                    <td colSpan={5} className="font-weight-bold">
                      <div className="d-flex">
                        <div className="align-self-center">
                          {category.name}
                        </div>
                      </div>
                    </td>
                  </tr>
                 {modifiedItems
                   .filter(i => i.item.categoryId === category.id)
                   .map(proxy => (
                   <tr key={proxy.item.id}>
                     <td style={colStyle.name}>{proxy.item.name}</td>
                     <td style={colStyle.stock}>
                       <Form>
                         <Form.Group controlId="stock">
                           <Form.Control
                             type="number"
                             min={0}
                             value={proxy.item.stock ?? ""}
                             onChange={onStockChange(proxy)}
                           />
                         </Form.Group>
                       </Form>
                     </td>
                     <td style={colStyle.stockPrice}>
                       <Form>
                         <Form.Group controlId="stockPrice">
                           <Form.Control
                             type="number"
                             min={0}
                             value={proxy.item.stockPrice ?? ""}
                             onChange={onStockPriceChange(proxy)}
                           />
                         </Form.Group>
                       </Form>
                     </td>
                     <td style={colStyle.sellPrice} className="text-right">{proxy.item.sellPrice}</td>
                   </tr>
                 ))}
                  </Fragment>
                ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SupplierHome;

const colStyle = {
  name: {
    width: "25%",
    wordBreak: "break-word",
  } as React.CSSProperties,
  stock: {
    width: "25%",
    wordBreak: "break-word",
  } as React.CSSProperties,
  stockPrice: {
    width: "25%",
    wordBreak: "break-word",
  } as React.CSSProperties,
  sellPrice: {
    width: "25%",
    wordBreak: "break-word",
  } as React.CSSProperties,
};
