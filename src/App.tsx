import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { AppDispatch } from "./app/store";
import { getWinners } from "./features/winners/winnersSlice";
import { getCars } from "./features/garage/garageThunks";
import { Header } from "./components";
import { Garage, Winners } from "./views";

import styles from './App.module.css';

export function App() {
  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getWinners());
        dispatch(getCars());
    }, [dispatch])
  return <div className={styles.app}>
    <Header />
    <Routes>
      <Route path="/garage" element={<Garage />} />
      <Route path="/winners" element={<Winners />} />
      <Route path='*' element={ <Navigate to='/garage' /> } />
    </Routes>
  </div>;
}