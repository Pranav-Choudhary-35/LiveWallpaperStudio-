import './index.css'
import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './Components/Navbar.jsx';
import { ToastContainer } from 'react-toastify';

// Lazy load page components for code splitting
const HOME = lazy(() => import('./Pages/HOME.jsx'))
const Collection = lazy(() => import('./Pages/Collection.jsx'))

// Loading fallback component
const LoadingFallback = () => (
  <div className='flex items-center justify-center min-h-screen'>
    <div className='text-center'>
      <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4'></div>
      <p className='text-xl text-gray-400'>Loading page...</p>
    </div>
  </div>
)

function App() {
  return (
    <div className='min-h-screen text-white w-full bg-gray-950'>
      <Navbar />
      {/* Added pt-28 to account for fixed navbar height */}
      <div className='pt-28 w-full'>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path='/' element={<HOME />}></Route>
            <Route path='/collection' element={<Collection />}></Route>
          </Routes>
        </Suspense>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
