import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Locations from './pages/Locations';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Temporary redirect to locations since homepage doesn't exist yet */}
        <Route path="/" element={<Navigate to="/locations" replace />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </BrowserRouter>
  );
}
