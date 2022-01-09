import { Link } from 'react-router-dom';
import Spinner from 'components/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'components/Modal';
import BootstrapForm from 'components/BootstrapForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  getViewItem,
  getIsOpening,
  fetchItem,
  updateItem,
} from 'redux/products';
import { useEffect, useState } from 'react';
import s from './ProductView.module.css';
import { useRouteMatch } from 'react-router-dom';

const ProductView = () => {
  const item = useSelector(getViewItem);
  const isOpening = useSelector(getIsOpening);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItem(match.params.id));
  }, [dispatch]);

  const handleEditProduct = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = formData => {
    setIsModalOpen(false);
    dispatch(updateItem({ id: match.params.id, data: formData }));
  };

  const renderComment = ({ id, description, date }) => {
    return (
      <ListGroup.Item className={s.comment} as={'li'} key={id}>
        <Card.Text>{description}</Card.Text>
        <span className={s.date}>{new Date(date).toDateString()}</span>
      </ListGroup.Item>
    );
  };

  const renderInfo = () => {
    const { imageUrl, name, count, size, weight, comments } = item;

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
    <>
      <Card>
        <Card.Header className={s.header}>
          <Link to={'/products'}>
            <Button>Back</Button>
          </Link>
          <Button disabled={!item} onClick={handleEditProduct}>
            Edit
          </Button>
        </Card.Header>
        {isOpening || !item ? (
          <div className={s.spinner}>
            <Spinner size={64} color={'#444'} />
          </div>
        ) : (
          renderInfo()
        )}
      </Card>

      {isModalOpen && !!item && (
        <Modal onClose={handleModalClose}>
          <BootstrapForm
            inputs={[
              {
                label: 'Name',
                type: 'text',
                name: 'name',
                value: item?.name,
              },
              {
                label: 'Count',
                type: 'number',
                name: 'count',
                value: item?.count,
              },
              {
                label: 'Width',
                type: 'number',
                name: 'width',
                value: item?.size.width,
              },
              {
                label: 'Height',
                type: 'number',
                name: 'height',
                value: item?.size.height,
              },
              {
                label: 'Weight',
                type: 'number',
                name: 'weight',
                value: item?.weight,
              },
            ]}
            buttonLabel={'Save'}
            onSubmit={handleModalSubmit}
            onClose={handleModalClose}
          />
        </Modal>
      )}
    </>
  );
};

export default ProductView;
