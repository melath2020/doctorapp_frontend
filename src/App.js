import { useSelector } from 'react-redux';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Spinner from './components/Spinner';
import Doctors from './pages/admin/Doctors';
import Users from './pages/admin/Users';
import ApplyDoctor from './pages/ApplyDoctor';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Notification from './pages/Notification';
import Register from './pages/Register';
import Profile from './pages/doctor/Profile';


function App() {
  const {loading}= useSelector(state=>state.alerts)
  return (
    <> 
    <BrowserRouter>
    {loading ? <Spinner/>:
    <Routes>
    <Route path='/' 
    element={
    <ProtectedRoute>
      <HomePage/>
    </ProtectedRoute>
   }/>
    <Route path='/apply-doctor' 
    element={
    <ProtectedRoute>
      <ApplyDoctor/>
    </ProtectedRoute>
   }/>

<Route path='/admin/doctors' 
    element={
    <ProtectedRoute>
      <Doctors/>
    </ProtectedRoute>
   }/>

<Route path='/admin/users' 
    element={
    <ProtectedRoute>
      <Users/>
    </ProtectedRoute>
   }/>

<Route path='/doctor/profile/:id' 
    element={
    <ProtectedRoute>
      <Profile/>
    </ProtectedRoute>
   }/>
   <Route path='/notification' 
    element={
    <ProtectedRoute>
      <Notification/>
    </ProtectedRoute>
   }/>
    <Route path='/login' element={
      <PublicRoute>
        <Login/>
      </PublicRoute>
    }/>
    <Route path='/register' element={
    <PublicRoute>
      <Register/>
    </PublicRoute>
    }/>
  </Routes>
    }
    
    </BrowserRouter>
     </>
  );
}

export default App;
