import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { Pagination } from '../components';
import { CarTracks } from '../features/garage/components/CarTracks/CarTracks';
import { selectCurrentCarsPage, selectTotalCars, selectTotalCarsPages, setCarsPage } from '../features/garage/garageSlice';

import styles from './Garage.module.css';



export function Garage() {
  const dispatch = useDispatch<AppDispatch>();
  const totalPages = useSelector(selectTotalCarsPages);
  const currentPage = useSelector(selectCurrentCarsPage);
  const totalCars = useSelector(selectTotalCars);
  return (
    <main className={styles.garage}>
      <h4>Garage ({totalCars > 0 ? totalCars : 'No Cars'})</h4>
      <CarTracks />
      <Pagination page={currentPage} totalPages={totalPages} setPage={(page) => dispatch(setCarsPage(page))} />
    </main>
  );
}
