import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import WatchList from './WatchList'
import MovieDetailsPage from './MovieDetails'
import NotFound from './NotFound'

const App = () => {
  return (
   <BrowserRouter >
    <Navbar />
    <Routes >
      <Route path='/' element={<Home />}/>
      <Route path='/details/:id' element={<MovieDetailsPage />} />
      <Route path='/watchlist' element={<WatchList />}/>
      <Route path='*' element={<NotFound />}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App