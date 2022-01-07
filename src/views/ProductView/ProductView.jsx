import { Link } from 'react-router-dom';

const ProductView = () => {
  return (
    <div>
      <Link to={'/products'}>Back</Link>
      Product Information
    </div>
  );
};

export default ProductView;
