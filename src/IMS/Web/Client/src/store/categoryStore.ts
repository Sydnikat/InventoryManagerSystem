import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryResponse } from "../models/category";
import {IItemResponse} from "../models/item";

export interface CategoryState {
  categories: ICategoryResponse[];
}

const initialCategoryState: CategoryState = {
  categories: [],
};

export const category = createSlice({
  name: "category",
  initialState: initialCategoryState,
  reducers: {
    setCategories(
      state: CategoryState,
      action: PayloadAction<ICategoryResponse[]>
    ) {
      state.categories = action.payload;
    },

    addNewCategory(
      state: CategoryState,
      action: PayloadAction<ICategoryResponse>
    ) {
      state.categories = [action.payload, ...state.categories];
    },

    deleteCategory(state: CategoryState, action: PayloadAction<number>) {
      const categoryId = action.payload;
      const list: ICategoryResponse[] = [];

      state.categories.forEach(c => {
        if (c.id !== categoryId) {
          list.push(c);
        }
      })

      state.categories = list;
    },

    addItemToCategory(
      state: CategoryState,
      action: PayloadAction<IItemResponse>
    ) {
      const item = action.payload;
      const index = state.categories.findIndex((c) => c.id === item.categoryId);

      if (index !== -1) {
        state.categories[index].items = [
          ...state.categories[index].items,
          item,
        ];
      }
    },

    changeItemInCategory(
      state: CategoryState,
      action: PayloadAction<IItemResponse>
    ) {
      const item = action.payload;
      const index = state.categories.findIndex((c) => c.id === item.categoryId);

      if (index !== -1) {
        const list: IItemResponse[] = [];
        state.categories[index].items.forEach(i => {
          if (i.id !== item.id) {
            list.push(i);
          } else {
            list.push(item);
          }
        });
        state.categories[index].items = list;
      }
    },

    deleteItemFromCategory(
      state: CategoryState,
      action: PayloadAction<IItemResponse>
    ) {
      const item = action.payload;
      const index = state.categories.findIndex((c) => c.id === item.categoryId);

      if (index !== -1) {
        const list: IItemResponse[] = [];
        state.categories[index].items.forEach(i => {
          if (i.id !== item.id) {
            list.push(i);
          }
        });
        state.categories[index].items = list;
      }
    },
  },
});

export const {
  setCategories,
  addNewCategory,
  deleteCategory,
  addItemToCategory,
  changeItemInCategory,
  deleteItemFromCategory,
} = category.actions;
export const categoryReducer = category.reducer;
