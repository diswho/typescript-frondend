import './App.css';
import { Route,Routes,Navigate,useLocation } from "react-router-dom";
import LogInForm from "./components/auth/LogInForm";
import Resource from "./components/resource/Resource";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LogInForm />} />
        <Route path='/resource' element={<Resource />} />
      </Routes>
    </div>
  );
}

export default App;
