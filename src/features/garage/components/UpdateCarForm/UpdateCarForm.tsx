import { useState } from 'react';
import { Form } from '../../../../components/';
import { updateCar } from '../../garageThunks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/store';

type UpdateCarFormProps = {
  selectedCar: number | null
}

export function UpdateCarForm({selectedCar}: UpdateCarFormProps) {
  const [carUpdateText, setCarUpdateText] = useState('');
  const [carUpdateColor, setCarUpdateColor] = useState('#000000');

  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateCar: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (carUpdateText && selectedCar) {
        dispatch(updateCar({carId: selectedCar, carData: {name: carUpdateText, color: carUpdateColor}}));
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
      onSubmit={handleUpdateCar}
      textValue={carUpdateText}
      onInputText={handleInputText}
      colorValue={carUpdateColor}
      onInputColor={handleInputColor}
    />
  );
}
