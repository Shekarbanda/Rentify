import React from 'react'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Route, Router, Routes } from 'react-router'
import ExploreItems from './Pages/ExploreItems'
import ScrollToTop from './Components/ScrollToTop'
import ItemDetails from './Pages/ItemDetails'
import BusinessOwnerDashboard from './Pages/BusinessOwner/BusinessOwnerDashboard'
import Dashboard from './Components/Dashboard'
import RequestsPage from './Pages/BusinessOwner/RequestsPage'
import OwnerProfile from './Pages/BusinessOwner/OwnerProfile'
import AddItem from './Pages/BusinessOwner/AddItem'
import AllItems from './Pages/BusinessOwner/AllItems'
import UserProfile from './Pages/UserProfile'
import ProfileInfo from './Pages/User/ProfileInfo'
import PostItem from './Components/PostItem'
import AddPost from './Pages/User/AddPost'
import WishlistPage from './Pages/User/WishlistPage'
import MyAdsPage from './Pages/User/MyAdsPage'
import UserRequestsPage from './Pages/User/UserRequestsPage'
import HistoryPage from './Pages/User/HistoryPage'
import ProtectedRoute from './Components/ProtectedRoute'
import BusinessProtectedRoute from './Components/BusinessProtectedRoute'
import UniversalPage from './Pages/UniversalPage'
import BusinessProtectedRoute2 from './Components/BusinessProtectedRoute2'
import RequestsSent from './Pages/User/RequestsSent'
import EditItem from './Components/EditItem'
import EditPostPage from './Pages/User/EditPage'
import EditItemPage from './Pages/BusinessOwner/EditPostPage'
import SettingsPage from './Pages/SettingsPage'
import HelpPage from './Pages/HelpPage'



export default function App() {
  return ( 
  <>
    <ScrollToTop/>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/explore-rentals' element={<BusinessProtectedRoute2><ExploreItems/></BusinessProtectedRoute2>}></Route>
    <Route path='/item/:itemId' element={<ItemDetails/>}></Route>
    <Route path='/business/dashboard' element={<BusinessProtectedRoute><BusinessOwnerDashboard/></BusinessProtectedRoute>}></Route>
    <Route path="/business/items" element={<BusinessProtectedRoute><AllItems/></BusinessProtectedRoute>} />
    <Route path="/business/add-item" element={<BusinessProtectedRoute><AddItem/></BusinessProtectedRoute>} />
    <Route path="/business/requests" element={<BusinessProtectedRoute><RequestsPage/></BusinessProtectedRoute>} />
    <Route path="/business/profile" element={<BusinessProtectedRoute><OwnerProfile /></BusinessProtectedRoute>} />
    <Route path='/business/requests/item/:itemId' element={<BusinessProtectedRoute><ItemDetails/></BusinessProtectedRoute>}/>
    <Route path='/business/requests/profile/:userId' element={<BusinessProtectedRoute><UserProfile/></BusinessProtectedRoute>}/>
    <Route path='/business/edit-item/:itemId' element={<BusinessProtectedRoute><EditItemPage/></BusinessProtectedRoute>}/>
    <Route path='/profile/:userId' element={<BusinessProtectedRoute2><UserProfile/></BusinessProtectedRoute2>}/>
    <Route path='/user-profile' element={<ProtectedRoute><ProfileInfo/></ProtectedRoute>}/>
    <Route path='/post' element={<ProtectedRoute><AddPost/></ProtectedRoute>}/>
    <Route path='/myads' element={<ProtectedRoute><MyAdsPage/></ProtectedRoute>}/>
    <Route path='/wishlist' element={<ProtectedRoute><WishlistPage/></ProtectedRoute>}/>
    <Route path='/receive-requests' element={<ProtectedRoute><UserRequestsPage/></ProtectedRoute>}/>
    <Route path='/sent-requests' element={<ProtectedRoute><UserRequestsPage/></ProtectedRoute>}/>
    <Route path='/edit-item/:itemId' element={<ProtectedRoute><EditPostPage/></ProtectedRoute>}/>
    <Route path='/history' element={<ProtectedRoute><HistoryPage/></ProtectedRoute>}/>
    <Route path='/settings' element={<ProtectedRoute><SettingsPage/></ProtectedRoute>}/>
    <Route path='/help' element={<HelpPage/>}/>
  
    <Route path="*" element={<UniversalPage />} />
  </Routes>
  </>
  )
}
