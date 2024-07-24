import { useState } from 'react';
import { Form } from '../../../../components/';
import { useDispatch } from 'react-redux';
import { createCar } from '../../garageThunks';
import { AppDispatch } from '../../../../app/store';

export function CreateCarForm({raceStarted}: {raceStarted: boolean}) {
  const [carCreateText, setCarCreateText] = useState('');
  const [carCreateColor, setCarCreateColor] = useState('#000000');

  const dispatch = useDispatch<AppDispatch>();

  const handleCreateCar: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (carCreateText && carCreateText.length < 15) {
        dispatch(createCar({name: carCreateText, color: carCreateColor}));
        setCarCreateText('');
        setCarCreateColor('#000000');
    }
  };

  const handleInputText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCarCreateText(e.target.value);
  };

  const handleInputColor: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCarCreateColor(e.target.value);
  };

  return (
    <Form
      inputPlaceholder="Type Car Brand"
      btnText="CREATE"
      onSubmit={handleCreateCar}
      textValue={carCreateText}
      onInputText={handleInputText}
      colorValue={carCreateColor}
      onInputColor={handleInputColor}
      disabled={!carCreateText || carCreateText.length > 15 || raceStarted}
    />
  );
}
