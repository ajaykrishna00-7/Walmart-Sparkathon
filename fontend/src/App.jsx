import { Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import styled from 'styled-components'
import Header from './components/HomeHeader'
import ProductDetail from './pages/ProductDetail'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const NavContainer = styled.nav`
  background-color: aliceblue;
  height: 10%;
`

function App() {
  return (
    <PageContainer>
      <NavContainer>
        <Header />
      </NavContainer>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </PageContainer>
  )
}

export default App
