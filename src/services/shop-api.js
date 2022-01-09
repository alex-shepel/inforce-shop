import axios from 'axios';

axios.defaults.baseURL =
  'https://61d7fbe8e6744d0017ba8882.mockapi.io/products/';

const getProducts = async () => (await axios.get('')).data;

const getProduct = async id => (await axios.get(`/${id}`)).data;

const addProduct = async data => (await axios.post('', { ...data })).data;

const deleteProduct = async id => (await axios.delete(`/${id}`)).data;

const editProduct = async (id, data) =>
  (await axios.put(`/${id}`, { ...data })).data;

export { getProducts, getProduct, addProduct, deleteProduct, editProduct };
