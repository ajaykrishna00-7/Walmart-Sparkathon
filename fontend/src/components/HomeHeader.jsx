import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'
import WalmartLogo from '../assets/Walmart-logo-13c3cdaa.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { horizontalScale, verticalScale, fontScale } from '../utils/scaling'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FaCartPlus } from 'react-icons/fa'

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #0053e2;
  padding: ${verticalScale(10)}px ${horizontalScale(20)}px;
  height: ${verticalScale(80)}px;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${horizontalScale(30)}px;
`

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  margin: 0 ${horizontalScale(10)}px;
  max-width: ${horizontalScale(800)}px;
  border-radius: ${horizontalScale(30)}px;
  background-color: white;
  align-items: center;
`

const SearchInput = styled.input`
  flex: 1;
  padding: ${verticalScale(15)}px;
  border: none;
  border-radius: ${horizontalScale(30)}px 0 0 ${horizontalScale(30)}px;
  outline: none;
  font-size: ${fontScale(16)}px;
`

const SearchButton = styled.button`
  background-color: #0039a6;
  color: white;
  aspect-ratio: 1;
  width: ${horizontalScale(35)}px;
  height: ${horizontalScale(35)}px;
  border: none;
  border-radius: 50%;
  margin-right: ${horizontalScale(3)}px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontScale(16)}px;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${horizontalScale(20)}px;
`

const StyledLink = styled(Link)`
  color: white;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  text-decoration: none;
  font-size: ${fontScale(16)}px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

const Logo = styled.img`
  width: ${horizontalScale(50)}px;
  height: ${verticalScale(50)}px;
  margin-right: ${horizontalScale(10)}px;
`

const DeliverTo = styled.div`
  color: white;
  font-size: ${fontScale(18)}px;
  background-color: #002e99;
  border-radius: ${horizontalScale(30)}px;
  padding: ${verticalScale(7)}px;
  min-width: ${horizontalScale(300)}px;
`
const PlaceHcontainer = styled.div`
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: #002e99;
  }
`

const Header = () => {
  return (
    <HeaderContainer>
      <LeftSection>
        <Logo src={WalmartLogo} alt="Walmart" />
        <DeliverTo>
          <strong style={{ justifySelf: 'center' }}>Pickup or delivery?</strong>
          <br />
          Sacramento, 95829
        </DeliverTo>
      </LeftSection>

      <SearchContainer>
        <SearchInput placeholder="Search everything at Walmart online and in store" />
        <SearchButton>
          <FontAwesomeIcon icon={faSearch} />
        </SearchButton>
      </SearchContainer>

      <RightSection>
        <PlaceHcontainer>
          <FontAwesomeIcon icon={faHeart} color="white" />
          <StyledLink to="/reorder">My Items</StyledLink>
        </PlaceHcontainer>
        <PlaceHcontainer>
          <StyledLink to="/account">Account</StyledLink>
        </PlaceHcontainer>
        <PlaceHcontainer>
          <FontAwesomeIcon icon={faShoppingCart} color="white" />
          <StyledLink to="/account">0.00</StyledLink>
        </PlaceHcontainer>
      </RightSection>
    </HeaderContainer>
  )
}

export default Header
