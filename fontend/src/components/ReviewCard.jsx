import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background-color: #fefefe;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
`

const Title = styled.h4`
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 6px;
`

const Meta = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 6px;
`

const Rating = styled.div`
  margin-bottom: 6px;
`

const Text = styled.p`
  font-size: 0.95rem;
  color: #333;
  margin: 8px 0;
`

const Helpfulness = styled.div`
  font-size: 0.8rem;
  color: #555;
  margin-top: 6px;
`

const Star = ({ filled }) => (
  <span style={{ color: filled ? '#f7b500' : '#ccc', fontSize: '1rem' }}>★</span>
)

const ReviewCard = ({ author, date, title, text, rating, helpfulCount, notHelpfulCount }) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Meta>
        By <strong>{author}</strong> on {date}
      </Meta>
      <Rating>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < rating} />
        ))}
      </Rating>
      <Text>{text}</Text>
      <Helpfulness>
        Helpful: {helpfulCount} | Not Helpful: {notHelpfulCount}
      </Helpfulness>
    </Card>
  )
}

export default ReviewCard
