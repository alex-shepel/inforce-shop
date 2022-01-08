import { createSelector } from '@reduxjs/toolkit';

const getItems = state => state.products.items;
const getViewItem = state => state.products.viewItem;
const getIsLoading = state => state.products.isLoading;
const getIsOpening = state => state.products.isOpening;
const getIsAdding = state => state.products.isAdding;
const getIsUpdating = state => state.products.isUpdating;
const getDeletingIds = state => state.products.deletingIds;
const getSortedItems = createSelector(getItems, items =>
  items ? [...items].sort((a, b) => a.name.localeCompare(b.name)) : null,
);

export {
  getItems,
  getViewItem,
  getIsLoading,
  getIsOpening,
  getIsAdding,
  getIsUpdating,
  getDeletingIds,
  getSortedItems,
};
