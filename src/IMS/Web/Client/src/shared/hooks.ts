import { useEffect, useState } from "react";
import { ICategoryResponse } from "../models/category";
import {supplyService} from "../services/supplyService";
import {categoriesService} from "../services/categoriesService";
import {setError} from "../store/errorStore";
import {useDispatch} from "react-redux";

export const useCategoriesForSupplier = (): {
  categories: ICategoryResponse[];
  categoriesLoading: boolean;
} => {
  const [categories, setCategories] = useState<ICategoryResponse[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  useEffect(() => {
    let isSubscribed = true;

    const fetchCategories = async () => {
      try {
        const fetchedCategories = await supplyService.getCategories();
        if (isSubscribed) {
          setCategories(fetchedCategories);
          setCategoriesLoading(false);
        }
      } catch (e) {
        console.log(e?.response?.data);
      }
    };

    void fetchCategories();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return { categories, categoriesLoading };
};

export const useCategoriesForManager = (): {
  categories: ICategoryResponse[];
  categoriesLoading: boolean;
} => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<ICategoryResponse[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  useEffect(() => {
    let isSubscribed = true;

    const fetchCategories = async () => {
      try {
        dispatch(setError({status: null, message: null}));
        const fetchedCategories = await categoriesService.getCategories();
        if (isSubscribed) {
          setCategories(fetchedCategories);
          setCategoriesLoading(false);
        }
      } catch (e) {
        console.log(e?.response?.data);
      }
    };

    void fetchCategories();

    return () => {
      isSubscribed = false;
    };
  }, [dispatch]);

  return { categories, categoriesLoading };
};
