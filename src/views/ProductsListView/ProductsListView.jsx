import { useDispatch, useSelector } from 'react-redux';
import {
  deleteItem,
  fetchItems,
  getDeletingIds,
  getIsLoading,
  getSortedItems,
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
  MODAL: 'modal',
};

const ProductsListView = () => {
  const [view, setView] = useState(View.LOADING);
  const [backupView, setBackupView] = useState('');
  const items = useSelector(getSortedItems);
  const isLoading = useSelector(getIsLoading);
  const deletingIds = useSelector(getDeletingIds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    setBackupView(view);
    setView(isLoading ? View.LOADING : backupView);
  }, [isLoading]);

  useEffect(() => {
    if (!items) {
      return;
    }
    setView(items.length === 0 ? View.EMPTY : View.NORMAL);
  }, [items]);

  const handleAddProduct = () => {
    setBackupView(view);
    setView(View.MODAL);
  };

  const handleModalClose = () => {
    setView(backupView);
  };

  const renderDeleteButton = id =>
    deletingIds.includes(id) ? (
      <Spinner size={24} />
    ) : (
      <Button onClick={() => dispatch(deleteItem(id))}>Delete</Button>
    );

  const renderItem = ({ id, name, count, imageUrl }) => (
    <li className={s.item} key={id}>
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
      <div className={s.contentWrapper}>
        {view === View.EMPTY && <p>There are nothing yet...</p>}

        {view === View.NORMAL && renderList()}

        {view === View.LOADING && <Spinner size={64} color={'#444'} />}
      </div>

      {view === View.MODAL && (
        <Modal onClose={handleModalClose}>
          <BootstrapForm
            inputs={[
              {
                label: 'Name',
                type: 'text',
                name: 'name',
              },
              {
                label: 'Email',
                type: 'email',
                name: 'email',
              },
              {
                label: 'Password',
                type: 'password',
                name: 'password',
              },
            ]}
            buttonLabel={'Register'}
            onSubmit={formData => {
              // dispatch();
            }}
            isSubmitting={isLoading}
          />
        </Modal>
      )}

      <div className={s.buttonWrapper}>
        <Button className={s.button} onClick={handleAddProduct}>
          Add
        </Button>
      </div>
    </>
  );
};

export default ProductsListView;
