import { Link } from 'react-router-dom';
import Spinner from 'components/Spinner';
import Container from 'components/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { getViewItem, getIsOpening, fetchItem } from 'redux/products';
import { useEffect } from 'react';
import s from './ProductView.module.css';
import { useRouteMatch } from 'react-router-dom';

const ProductView = () => {
  const item = useSelector(getViewItem);
  const isOpening = useSelector(getIsOpening);
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItem(match.params.id));
  }, [dispatch]);

  const renderComment = ({ id, description, date }) => {
    return (
      <ListGroup.Item className={s.comment} as={'li'} key={id}>
        <Card.Text>{description}</Card.Text>
        <span className={s.date}>{new Date(date).toDateString()}</span>
      </ListGroup.Item>
    );
  };

  const renderInfo = () => {
    const { id, imageUrl, name, count, size, weight, comments } = item;

    return (
      <>
        <Card.Img variant="top" src={imageUrl} alt={'product poster'} />
        <Card.Body>
          <Card.Title className={s.cardTitle}>{name}</Card.Title>
          <ListGroup horizontal as={'ul'}>
            <ListGroup.Item as={'li'}>Count: {count}</ListGroup.Item>
            <ListGroup.Item as={'li'}>
              Size: {size.width}x{size.height}
            </ListGroup.Item>
            <ListGroup.Item as={'li'}>Weight: {weight}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          <Card.Subtitle className={s.subtitle}>Comments</Card.Subtitle>
          <ListGroup as={'ul'}>
            {comments.map(comment => renderComment(comment))}
          </ListGroup>
        </Card.Footer>
      </>
    );
  };

  return (
    <Card>
      <Card.Header className={s.header}>
        <Link to={'/products'}>
          <Button>Back</Button>
        </Link>
        <Button>Edit</Button>
      </Card.Header>
      {isOpening || !item ? <Spinner size={64} color={'#444'} /> : renderInfo()}
    </Card>
  );
};

export default ProductView;
