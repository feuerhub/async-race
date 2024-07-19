import { useState } from 'react';
import { Form } from '../../../../components/';
// import { useDispatch } from 'react-redux';

export function UpdateCarForm() {
  const [carUpdateText, setCarUpdateText] = useState('');
  const [carUpdateColor, setCarUpdateColor] = useState('#000000');

//   const dispatch = useDispatch<AppDispatch>();

  const handleCreateCar: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (carUpdateText) {
        // dispatch(updateCar({name: carCreateText, color: carCreateColor}));
        setCarUpdateText('');
        setCarUpdateColor('#000000');
    }
  };

  const handleInputText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCarUpdateText(e.target.value);
  };

  const handleInputColor: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCarUpdateColor(e.target.value);
  };

  return (
    <Form
      inputPlaceholder="Type Car Brand"
      btnText="UPDATE"
      onSubmit={handleCreateCar}
      textValue={carUpdateText}
      onInputText={handleInputText}
      colorValue={carUpdateColor}
      onInputColor={handleInputColor}
    />
  );
}
