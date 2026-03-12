import React from 'react'
import AppRouter from './routes/AppRouter'

const App = () => {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <AppRouter />
    </div>
  )
}

export default App