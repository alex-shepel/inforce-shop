import { useDispatch, useSelector } from 'react-redux';
import {
  fetchItems,
  addItem,
  deleteItem,
  getDeletingIds,
  getIsLoading,
  getSortedItems,
  getIsAdding,
} from 'redux/products';
import { useEffect, useState } from 'react';
import Spinner from 'components/Spinner';
import Modal from 'components/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import s from './ProductsListView.module.css';
import { Link } from 'react-router-dom';
import BootstrapForm from 'components/BootstrapForm';

const View = {
  EMPTY: 'empty',
  LOADING: 'loading',
  NORMAL: 'normal',
};

const ProductsListView = () => {
  const [view, setView] = useState(View.LOADING);
  const [backupView, setBackupView] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const items = useSelector(getSortedItems);
  const isLoading = useSelector(getIsLoading);
  const isAdding = useSelector(getIsAdding);
  const deletingIds = useSelector(getDeletingIds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    setBackupView(view);
    setView(isLoading || isAdding ? View.LOADING : backupView);
  }, [isLoading, isAdding]);

  useEffect(() => {
    if (!items) {
      return;
    }
    setView(items.length === 0 ? View.EMPTY : View.NORMAL);
  }, [items]);

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = formData => {
    setIsModalOpen(false);
    dispatch(addItem(formData));
  };

  const renderDeleteButton = id =>
    deletingIds.includes(id) ? (
      <Spinner size={24} />
    ) : (
      <Button onClick={() => dispatch(deleteItem(id))}>Delete</Button>
    );

  const renderItem = ({ id, name, count, imageUrl }) => (
    <li key={id}>
      <Card>
        <Link to={`/products/${id}`}>
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={'product poster'}
            loading={'lazy'}
          />
          <Card.Body>
            <Card.Title className={s.cardTitle}>{name}</Card.Title>
          </Card.Body>
        </Link>
        <Card.Footer className={s.cardFooter}>
          <span>Count: {count}</span>
          {renderDeleteButton(id)}
        </Card.Footer>
      </Card>
    </li>
  );

  const renderList = () => (
    <ul className={s.list}>{items.map(item => renderItem(item))}</ul>
  );

  return (
    <>
      <div className={s.scrollWrapper}>
        <div className={s.contentWrapper}>
          {view === View.EMPTY && <p>There are nothing yet...</p>}

          {view === View.NORMAL && renderList()}

          {view === View.LOADING && <Spinner size={64} color={'#444'} />}
        </div>
      </div>

      <div className={s.buttonWrapper}>
        <Button className={s.button} onClick={handleAddProduct}>
          Add
        </Button>
      </div>

      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <BootstrapForm
            inputs={[
              {
                label: 'Name',
                type: 'text',
                name: 'name',
              },
              {
                label: 'Count',
                type: 'number',
                name: 'count',
              },
              {
                label: 'Width',
                type: 'number',
                name: 'width',
              },
              {
                label: 'Height',
                type: 'number',
                name: 'height',
              },
              {
                label: 'Weight',
                type: 'number',
                name: 'weight',
              },
            ]}
            buttonLabel={'Add'}
            onSubmit={handleModalSubmit}
            onClose={handleModalClose}
          />
        </Modal>
      )}
    </>
  );
};

export default ProductsListView;
