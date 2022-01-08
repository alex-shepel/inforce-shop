import PropTypes from 'prop-types';
import s from './BootstrapForm.module.css';
import Spinner from 'components/Spinner';
import useFormState from 'hooks/useFormState';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const BootstrapForm = ({ inputs, buttonLabel, onSubmit, isSubmitting }) => {
  const [formState, setFormState, clearFormState] = useFormState(
    inputs.map(input => input.name),
  );

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formState);
    clearFormState();
  };

  const createInput = config => (
    <FloatingLabel
      className={'mb-3'}
      label={config.label}
      controlId={config.name}
      key={config.name}
    >
      <Form.Control
        as={'input'}
        type={config.type}
        value={formState[config.name]}
        onChange={e => setFormState(config.name, e.target.value)}
        placeholder={config.label}
        required
      />
    </FloatingLabel>
  );

  const createButton = () => (
    <div className={s.buttonContainer}>
      <Button disabled={isSubmitting} type="submit" variant={'primary'}>
        {buttonLabel}
      </Button>
      {isSubmitting && <Spinner />}
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      {inputs.map(createInput)}
      {createButton()}
    </Form>
  );
};

BootstrapForm.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'email', 'password', 'phone']).isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default BootstrapForm;
