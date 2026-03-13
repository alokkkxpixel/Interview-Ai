import HomePage from '@/pages/HomePage'
import { LoginCardPage } from '../features/auth/pages/LoginCardPage'
import { RegisterCardPage } from '../features/auth/pages/RegisterCardPage'
import { Route, Routes } from 'react-router-dom'
import ProtectedWrapper from '../features/auth/components/ProtectedWrapper'

const AppRouter = () => {
  return (
    <div>
       <Routes>
            <Route path="/home" element={<ProtectedWrapper><HomePage /></ProtectedWrapper>} />
            {/* <Route path="/about" element={<About />} />  */}
            <Route path="/auth/login" element={<LoginCardPage />} />
            <Route path="/auth/register" element={<RegisterCardPage />} />
        </Routes>
    </div>
  )
}

export default AppRouter