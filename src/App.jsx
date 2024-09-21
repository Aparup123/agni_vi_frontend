import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Main from "./pages/Main"
import About from "./pages/About"
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home"
function App() {
    const router=createBrowserRouter([
        {
            path:'/',
            element:<Home/>,
            children:[
                {
                    index:true,
                    element:<Main/>
                },
                {
                    path: '/about',
                    element: <About/>
                }
            ],
            errorElement:<ErrorPage/>
        },
       
    ])
  return (
    <div className="bg-galaxy bg-no-repeat bg-cover bg-center bg-fixed"><RouterProvider router={router}/></div>  
)
}

export default App