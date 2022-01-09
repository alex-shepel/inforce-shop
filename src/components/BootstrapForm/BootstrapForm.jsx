import PropTypes from 'prop-types';
import s from './BootstrapForm.module.css';
import useFormState from 'hooks/useFormState';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useEffect } from 'react';

const BootstrapForm = ({ inputs, buttonLabel, onSubmit, onClose }) => {
  const [formState, setFormState, clearFormState] = useFormState(
    inputs.map(input => ({
      key: input.name,
      value: input.value ? input.value : '',
    })),
  );

  useEffect(() => {
    console.log('inputs :', inputs);
    // inputs.forEach(input =>
    //   setFormState(input.name, input.value ? input.value : ''),
    // );
    // setFormState('name', 'hello');
  }, [inputs]);

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

  const createButtons = () => (
    <div className={s.buttonContainer}>
      <Button type="submit" variant={'primary'}>
        {buttonLabel}
      </Button>
      <Button variant={'secondary'} onClick={onClose}>
        Cancel
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      {inputs.map(createInput)}
      {createButtons()}
    </Form>
  );
};

BootstrapForm.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'number']).isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BootstrapForm;
