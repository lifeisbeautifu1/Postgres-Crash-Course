import { Routes, Route } from 'react-router-dom';
import { Home, Update, Details } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants/:id/update" element={<Update />} />
      <Route path="/restaurants/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
