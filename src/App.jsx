import { useState } from 'react'
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './router'

function App() {

  return (
    // <Layout>
      <Router>
        <div className="">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page title={route.title} />} />;
            })}
          </Routes>
        </div>
      </Router>
    // </Layout>
  )
}

export default App
