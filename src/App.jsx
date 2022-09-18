import { Fragment, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './router'
import { DefaultLayout } from './share/layout'
import { Loading } from './share/components'

function App() {

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <div>
          <Routes>
            {publicRoutes.map((route, index) => {
              // const Layout = route.layout === null ? Fragment : DefaultLayout

              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              const Page = route.component
              return <Route key={index} path={route.path} element={
                <Layout>
                  <Page title={route.title} />
                </Layout>
              } />;
            })}
          </Routes>
        </div>
      </Suspense>
    </Router>
  )
}

export default App
