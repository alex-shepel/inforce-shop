import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import s from './Spinner.module.css';

const Spinner = ({ size = 18, color = '#888' }) => {
  return (
    <span className={s.spinner}>
      <Loader
        type="Oval"
        color={color}
        height={size}
        width={size}
        timeout={0}
      />
    </span>
  );
};

Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Spinner;
