import styled from 'styled-components'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { horizontalScale, verticalScale, fontScale } from '../utils/scaling'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import bikeImage from '../assets/bike.jpg'
import sofaImage from '../assets/sofa.jpeg'

const Card = styled.div`
  min-width: ${horizontalScale(220)}px;
  max-width: ${horizontalScale(250)}px;
  padding: ${verticalScale(10)}px;
  border-radius: ${horizontalScale(10)}px;
  text-align: center;
  position: relative;
  font-family: Arial, sans-serif;
  margin-top: ${verticalScale(10)}px;
  background-color: #fff;
  cursor: pointer;
`

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: ${verticalScale(10)}px;
`

const FavoriteIconContainer = styled.div`
  position: absolute;
  top: ${verticalScale(20)}px;
  right: ${horizontalScale(20)}px;
  background-color: #ffffff;
  padding: ${verticalScale(7)}px;
  width: 20px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  aspect-ratio: 1;
  border-radius: ${verticalScale(20)}px;

  &:hover {
    background-color: #807a7a;
  }
`

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${horizontalScale(8)}px;
  margin: ${verticalScale(5)}px 0;
`

const NewPrice = styled.span`
  color: green;
  font-weight: bold;
  font-size: ${fontScale(19)}px;
`

const OldPrice = styled.span`
  text-decoration: line-through;
  color: #777;
  font-size: ${fontScale(14)}px;
`

const ProductTitle = styled.p`
  font-size: ${fontScale(15)}px;
  color: #333;
  margin: ${verticalScale(8)}px 0;
`

const OptionsButton = styled.button`
  border: 1px solid #333;
  background: white;
  padding: ${verticalScale(5)}px ${horizontalScale(10)}px;
  border-radius: ${horizontalScale(20)}px;
  cursor: pointer;
  margin-top: ${verticalScale(8)}px;
  font-size: ${fontScale(14)}px;

  &:hover {
    background: #f2f2f2;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const imageMap = {
  '/assets/bike.jpg': bikeImage,
  '/assets/sofa.jpeg': sofaImage,
}

const ProductCard = ({ id, image, newPrice, oldPrice, title }) => {
  console.log('ProductCard rendered with id:', id)
  return (
    <StyledLink to={`/product/${id}`}>
      <Card>
        <FavoriteIconContainer>
          <FontAwesomeIcon icon={faHeart} />
        </FavoriteIconContainer>
        <ProductImage
          src={imageMap[image] || image}
          alt={title}
        />
        <PriceSection>
          <NewPrice>Now ${newPrice}</NewPrice>
          <OldPrice>${oldPrice}</OldPrice>
        </PriceSection>
        <ProductTitle>{title}</ProductTitle>
        <OptionsButton>Options</OptionsButton>
      </Card>
    </StyledLink>
  )
}

export default ProductCard
