import { Fragment, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './router'
import { DefaultLayout } from './share/layout'
import { Loading } from './share/components'
import ScrollToTop from './utils/scrollToTop'

function App() {
  //** check expired token */
  const expiredToken = localStorage.getItem('EXPIRED_TOKEN')
  console.log(expiredToken)

  useEffect(() => {
    if (expiredToken) {
      console.log(expiredToken)
    }
  }, [expiredToken])

  return (
    <Router>
      <ScrollToTop>
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

              {privateRoutes.map((route, index) => {
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
      </ScrollToTop>
    </Router>
  )
}

export default App
