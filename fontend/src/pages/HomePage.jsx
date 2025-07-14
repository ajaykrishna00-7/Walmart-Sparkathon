import styled from 'styled-components'
import ProductSection from '../components/ProductSection'
import { useEffect, useState } from 'react'
import axios from 'axios'

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
`

const SectionTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5rem;
`

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error('Failed to fetch products:', err))
  }, [])

  return (
    <SectionContainer>
      <div>
        <SectionTitle>Best Sellers</SectionTitle>
        <ProductSection products={products} />
        <SectionTitle>New Arrivals</SectionTitle>
        <ProductSection products={products} />
      </div>
    </SectionContainer>
  )
}

export default Home
