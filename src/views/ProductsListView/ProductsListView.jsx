import { useDispatch, useSelector } from 'react-redux';
import {
  deleteItem,
  fetchItems,
  getIsDeleting,
  getIsLoading,
  getSortedItems,
} from 'redux/products';
import { useEffect } from 'react';
import Spinner from 'components/Spinner';
import Container from 'components/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import s from './ProductsListView.module.css';
import { Link } from 'react-router-dom';

const ProductsListView = () => {
  const items = useSelector(getSortedItems);
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

  const renderList = () =>
    items.length === 0 ? (
      <p>There are no contacts yet...</p>
    ) : (
      <ul className={s.list}>{items.map(item => renderItem(item))}</ul>
    );

  return (
    <>
      <div className={s.listWrapper}>
        {isLoading ? <Spinner size={64} color={'#444'} /> : renderList()}
      </div>
      <div className={s.buttonWrapper}>
        <Button className={s.button}>Add</Button>
      </div>
    </>
  );
};

export default ProductsListView;
