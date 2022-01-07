import { Link } from 'react-router-dom';

const ProductsListView = () => {
  return (
    <div>
      <Link to={'/products/1'}>Product1</Link>
      <Link to={'/products/2'}>Product2</Link>
      <Link to={'/products/3'}>Product3</Link>
    </div>
  );
};

export default ProductsListView;
