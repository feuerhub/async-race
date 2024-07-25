import { useDispatch, useSelector } from 'react-redux';
import { selectUpdateCarColor, selectUpdateCarName, setUpdateCarColor, setUpdateCarName } from '../../../userInputs/userInputs';
import { updateCar } from '../../garageThunks';
import { AppDispatch } from '../../../../app/store';
import { Form } from '../../../../components/';

type UpdateCarFormProps = {
  selectedCar: number | null;
  raceStarted: boolean;
};

export function UpdateCarForm({
  selectedCar,
  raceStarted,
}: UpdateCarFormProps) {
  const updateCarName = useSelector(selectUpdateCarName);
  const updateCarColor = useSelector(selectUpdateCarColor);
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateCar: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (updateCarName && updateCarName.length < 15 && selectedCar) {
      dispatch(
        updateCar({
          carId: selectedCar,
          carData: { name: updateCarName, color: updateCarColor },
        }),
      );
      dispatch(setUpdateCarName(''));
      dispatch(setUpdateCarColor('#000000'));
    }
  };

  const handleInputText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setUpdateCarName(e.target.value));
  };

  const handleInputColor: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setUpdateCarColor(e.target.value));
  };

  return (
    <Form
      inputPlaceholder="Type Car Brand"
      btnText="UPDATE"
      onSubmit={handleUpdateCar}
      textValue={updateCarName}
      onInputText={handleInputText}
      colorValue={updateCarColor}
      onInputColor={handleInputColor}
      disabled={
        !updateCarName ||
        updateCarName.length > 15 ||
        !selectedCar ||
        raceStarted
      }
    />
  );
}
