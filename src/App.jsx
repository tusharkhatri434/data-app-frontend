import { useState } from 'react'
import Body from './components/Body'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './components/SignUp'
import NotFoundPage from './components/NotFoundPage'

const Router = createBrowserRouter([{
  path:"/",
  element:<SignUp />,

},{
  path:"/bar",
  element:<Body />
},{
  path:"*",
  element:<NotFoundPage />
}])


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={Router} />
    </>
  )
}

export default App
