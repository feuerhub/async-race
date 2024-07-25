import { useDispatch, useSelector } from 'react-redux';
import { selectCreateCarColor, selectCreateCarName, setCreateCarColor, setCreateCarName } from '../../../userInputs/userInputs';
import { createCar } from '../../garageThunks';
import { AppDispatch } from '../../../../app/store';
import { Form } from '../../../../components/';

export function CreateCarForm({ raceStarted }: { raceStarted: boolean }) {
  const createCarName = useSelector(selectCreateCarName);
  const createCarColor = useSelector(selectCreateCarColor);
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateCar: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (createCarName && createCarName.length < 15) {
      dispatch(createCar({ name: createCarName, color: createCarColor }));
      dispatch(setCreateCarName(''));
      dispatch(setCreateCarColor('#000000'));
    }
  };

  const handleInputText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setCreateCarName(e.target.value));
  };

  const handleInputColor: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setCreateCarColor(e.target.value));
  };

  return (
    <Form
      inputPlaceholder="Type Car Brand"
      btnText="CREATE"
      onSubmit={handleCreateCar}
      textValue={createCarName}
      onInputText={handleInputText}
      colorValue={createCarColor}
      onInputColor={handleInputColor}
      disabled={!createCarName || createCarName.length > 15 || raceStarted}
    />
  );
}
