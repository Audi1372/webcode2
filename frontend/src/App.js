import React from 'react';
import './App.css';
import Header from './component/header/Header';
import Index from './component/index/Index';
import { Routes, Route } from 'react-router-dom';
import Question from './component/Add-question/Question';
import Index1 from './component/ViewQuestion/Index1';
import Home from './component/Auth/Home';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase'
import { useEffect } from 'react';
import { login, logout, selectUser } from "./features/userSlice";




function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
      // console.log(authUser);
    });
  }, [dispatch]);
  //
  return (
    <div className="App">
      <Header />
      <Routes>

        <Route path={user ? '/' : '/auth'} element={user ? <Index /> : <Home />} />
        <Route path={user ? '/add-question' : '/auth'} element={user ? <Question /> : <Home />} />
        <Route path={user ? '/question' : '/auth'} element={user ? <Index1 /> : <Home />} />
        <Route path='/auth' element={<Home />} />

        {/* <Route exact path="/auth" component={<Home />} />
        <Route exact path="/" component={<Index />} />
        <Route exact path="/add-question" component={<Question />} />
        <Route exact path="/question" component={<Index1 />} /> */}


      </Routes>

    </div>
  );
}

export default App; 
