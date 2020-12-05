import React, {Fragment, useEffect, useState } from "react";
import {Button, Col, Container, Row, Spinner, Table} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSignOutAlt,
  faTrash,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userStore";
import {useCategoriesForManager} from "../shared/hooks";
import { setCategories } from "../store/categoryStore";
import { RootState } from "../store/rootReducer";
import {ICategoryResponse} from "../models/category";
import NewCategory from "./modals/NewCategory";
import NewItem from "./modals/NewItem";
import {IItemResponse} from "../models/item";
import DeleteItem from "./modals/DeleteItem";
import DeleteCategory from "./modals/DeleteCategory";
import EditItem from "./modals/EditItem";
import {getGlobalErrorStatus} from "../shared/helperFunctions";
import CommonAlert from "./CommonAlert";

const ManagerHome: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categoryReducer.categories);
  const { categories: fetchedCategories, categoriesLoading } = useCategoriesForManager();
  const [showNewCategory, setShowNewCategory] = useState<boolean>(false);
  const [chosenCategory, setChosenCategory] = useState<ICategoryResponse  | null>(null);
  const [chosenItem, setChosenItem] = useState<IItemResponse  | null>(null);
  const [showNewItem, setShowNewItem] = useState<boolean>(false);
  const [showDeleteItem, setShowDeleteItem] = useState<boolean>(false);
  const [showEditItem, setShowEditItem] = useState<boolean>(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setCategories(fetchedCategories));
  }, [fetchedCategories, dispatch]);

  const onSignout = () => {
    dispatch(setUser(undefined));
    dispatch(setCategories([]));
  };

  const onNewCategoryClick = () => {
    setShowNewCategory(true);
  };

  const onNewItemClick = (category: ICategoryResponse) => () => {
    setChosenCategory(category);
    setShowNewItem(true);
  };

  const onDeleteItemClick = (item: IItemResponse) => () => {
    setChosenItem(item);
    setShowDeleteItem(true);
  };

  const onEditItemClick = (item: IItemResponse) => () => {
    setChosenItem(item);
    setShowEditItem(true);
  };

  const onDeleteCategoryClick = (category: ICategoryResponse) => () => {
    setChosenCategory(category);
    setShowDeleteCategory(true);
  };

  return (
    <div>
      <Container fluid className="mt-2 mb-2">
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Row className="mb-3">
              <Button size="sm" className="mr-2" onClick={onNewCategoryClick}>
                <FontAwesomeIcon icon={faPlus} size="sm" className="mr-2" />
                Új Kategória
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
                  <th>Név</th>
                  <th>Darabszám</th>
                  <th>Raktári Ár</th>
                  <th>Eladási Ár</th>
                  <th className="text-right">Műveletek</th>
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
                          <div className="ml-auto">
                            <Button size="sm" className="mr-2" onClick={onNewItemClick(category)}>
                              <FontAwesomeIcon icon={faPlus} className="mr-2" />
                              Új áru
                            </Button>
                            <Button size="sm" onClick={onDeleteCategoryClick(category)}>
                              <FontAwesomeIcon icon={faTrash} className="mr-2" />
                              Törlés
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {category.items.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.stock}</td>
                        <td>{item.stockPrice}</td>
                        <td>{item.sellPrice}</td>
                        <td className="text-right">
                          <Button size="sm" variant="info" className="mr-2" onClick={onEditItemClick(item)}>
                            <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                            Módosít
                          </Button>
                          <Button size="sm" variant="info" onClick={onDeleteItemClick(item)}>
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            Törlés
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
                </tbody>
              </Table>
            )}
            {getGlobalErrorStatus() !== null && getGlobalErrorStatus() === 503 && (
              <div className="mt-3">
                <CommonAlert variant="danger" text={"A szolgáltatás nem elérhető"} />
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modals */}
      {showNewCategory && (
        <NewCategory
          showNewCategory={showNewCategory}
          setShowNewCategory={setShowNewCategory}
        />
      )}

      {showNewItem && chosenCategory !== null && (
        <NewItem
          categoryId={chosenCategory.id}
          showNewItem={showNewItem}
          setShowNewItem={setShowNewItem}
        />
      )}

      {showDeleteItem && chosenItem !== null && (
        <DeleteItem
          item={chosenItem}
          showDeleteItem={showDeleteItem}
          setShowDeleteItem={setShowDeleteItem}
        />
      )}

      {showDeleteCategory && chosenCategory !== null && (
        <DeleteCategory
          category={chosenCategory}
          showDeleteCategory={showDeleteCategory}
          setShowDeleteCategory={setShowDeleteCategory}
        />
      )}

      {showEditItem && chosenItem !== null && (
        <EditItem
          item={chosenItem}
          showEditItem={showEditItem}
          setShowEditItem={setShowEditItem}
        />
      )}
    </div>
  );
};

export default ManagerHome;
