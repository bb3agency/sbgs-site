import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Locations from './pages/Locations';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Locations />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </BrowserRouter>
  );
}
