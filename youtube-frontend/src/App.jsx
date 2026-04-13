import Home from './pages/Home'
import Layout from './components/Layout';
import NoPageFound from './components/NoPageFound';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Listchannels from './pages/Listchannels';
import Newchannel from './pages/Newchannel';
import Viewchannel from './pages/Viewchannel';
import Uploadvideo from './pages/uploadvideo';
import Viewvideo from './pages/Viewvideo';
import Searchpage from './pages/Searchpage';

import {Authuser} from './components/Authuser';

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'

function App() {

  const router=createBrowserRouter([
    {
 element:<Layout/>,
 errorElement:<NoPageFound/>,
    children:[
                {
                      path:"/",
                      element:<Home/>
                  },
                  {
                      path:"/register",
                      element:<Register/>
                  },
                   {
                      path:"/login",
                      element:<Login/>
                  },
                  {
                      path:"/search",
                      element:<Searchpage/>
                  },
                  {
                      path:"/video/:id",
                      element:<Viewvideo/>
                  },
                  {
                    path:"/profile",
                    element:(
                    <Authuser>
                      <Profile/>
                      </Authuser>
                      )
                  },
                  {
                    path:"/listchannels",
                    element:(
                    <Authuser>
                      <Listchannels/>
                      </Authuser>
                      )
                  },
                    {
                    path:"/newchannel",
                    element:(
                    <Authuser>
                      <Newchannel/>
                      </Authuser>
                      )
                  },
                  {
                    path:"/viewchannel/:id",
                    element:(
                    <Authuser>
                      <Viewchannel/>
                      </Authuser>
                      )
                  },
                  {
                    path:"/uploadvideo/:id",
                    element:(
                    <Authuser>
                      <Uploadvideo/>
                      </Authuser>
                      )
                  },
                  
              ]   
    }

    ]);

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
