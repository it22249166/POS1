import 'antd/dist/reset.css'; 
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Homepage from './Pages/Homepage';  
import Itempage from './Pages/Itempage';
import Billpage from './Pages/BillPage';
import Customerspage from './Pages/Customerpage';
import Supplierspage from './Pages/Supplierpage';
import Reportspage from './Pages/Reportpage';
import Settingspage from './Pages/Settingpage';
import Helppage from './Pages/Helppage';
import Logoutpage from './Pages/Logoutpage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/items" element={<Itempage />} />
          <Route path="/bills" element={<Billpage />} />
          <Route path="/customers" element={<Customerspage />} />
          <Route path="/suppliers" element={<Supplierspage />} />
          <Route path="/reports" element={<Reportspage />} />
          <Route path="/settings" element={<Settingspage />} />
          <Route path="/help" element={<Helppage />} />
          <Route path="/logout" element={<Logoutpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
