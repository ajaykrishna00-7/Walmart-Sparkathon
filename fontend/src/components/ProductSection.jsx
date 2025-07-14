import styled from 'styled-components'
import ProductCard from '../components/ProductCard'

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 10px;
  width: 100%;
  flex-wrap: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

const ProductSection = ({ products }) => {
  return (
    <ScrollContainer>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          newPrice={product.newPrice}
          oldPrice={product.oldPrice}
          title={product.title}
        />
      ))}
    </ScrollContainer>
  )
}

export default ProductSection
