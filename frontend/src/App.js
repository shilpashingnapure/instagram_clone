import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Component/home';
import { PrivateRoute } from './Component/privateRoute';
import { AuthComponent } from './Component/auth-components/auth';
import { Register } from './Component/auth-components/signup';
import { Profile } from './Component/user-profile/profile';
import { EditUser } from './Component/user-profile/edit-user';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />}/>
          <Route path='/:username' element={<Profile />}/>
          <Route path='/edit' element={<EditUser />}/>
        </Route>
        <Route path='/login' element={<AuthComponent />} />
        <Route path='/signup' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
