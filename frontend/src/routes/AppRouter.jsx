import { LoginCardPage } from '../features/auth/pages/LoginCardPage'
import { RegisterCardPage } from '../features/auth/pages/RegisterCardPage'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <div>
       <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />  */}
            <Route path="/auth/login" element={<LoginCardPage />} />
            <Route path="/auth/register" element={<RegisterCardPage />} />
        </Routes>
    </div>
  )
}

export default AppRouter