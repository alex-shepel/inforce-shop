import { createSelector } from '@reduxjs/toolkit';

const getItems = state => state.products.items;
const getIsLoading = state => state.products.isLoading;
const getIsOpening = state => state.products.isOpening;
const getIsAdding = state => state.products.isAdding;
const getIsUpdating = state => state.products.isUpdating;
const getIsDeleting = state => state.products.isDeleting;
const getSortedItems = createSelector(getItems, items =>
  items.sort((a, b) => a.localeCompare(b)),
);

export {
  getItems,
  getIsLoading,
  getIsOpening,
  getIsAdding,
  getIsUpdating,
  getIsDeleting,
  getSortedItems,
};
