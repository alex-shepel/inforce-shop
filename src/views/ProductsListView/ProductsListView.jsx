import { useDispatch, useSelector } from 'react-redux';
import {
  deleteItem,
  fetchItems,
  getIsDeleting,
  getIsLoading,
  getItems,
} from 'redux/products';
import { useEffect } from 'react';
import Spinner from 'components/Spinner';
import Container from 'components/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import s from './ProductsListView.module.css';
import { Link } from 'react-router-dom';

const ProductsListView = () => {
  const items = useSelector(getItems);
  const isLoading = useSelector(getIsLoading);
  const isDeleting = useSelector(getIsDeleting);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const renderDeleteButton = id =>
    isDeleting ? (
      <Spinner />
    ) : (
      <Button onClick={() => dispatch(deleteItem(id))}>Delete</Button>
    );

  const renderItem = ({ id, name, imageUrl }) => (
    <li className={s.item} key={id}>
      <Card>
        <Link to={`/products/${id}`}>
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={'product poster'}
            loading={'lazy'}
          />
        </Link>
        <Card.Body>
          <Card.Title className={s.cardTitle} onClick={() => {}}>
            <Link to={`/products/${id}`}>{name}</Link>
          </Card.Title>
          {renderDeleteButton(id)}
        </Card.Body>
      </Card>
    </li>
  );

  const renderList = () =>
    items.length === 0 ? (
      <p>There are no contacts yet...</p>
    ) : (
      <ul className={s.list}>{items.map(item => renderItem(item))}</ul>
    );

  return (
    <Container>
      {isLoading ? <Spinner size={64} color={'#444'} /> : renderList()}
    </Container>
  );
};

export default ProductsListView;
