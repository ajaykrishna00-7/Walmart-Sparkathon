import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReviewCard from '../components/ReviewCard'
import axios from 'axios'
import bikeImage from '../assets/bike.jpg'
import sofaImage from '../assets/sofa.jpeg'

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  padding: 32px 0;
  background: #f7f7f7;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  justify-content: center;
  align-items: flex-start;
`

const GallerySection = styled.div`
  flex: 0 0 20%;
  max-width: 220px;
  min-width: 110px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  background: transparent;
`

const DetailsSection = styled.div`
  flex: 0 0 38%;
  min-width: 320px;
  max-width: 480px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 32px 36px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`

const ReviewsSectionFlex = styled.div`
  flex: 1 1 40%;
  min-width: 320px;
  max-width: 600px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  padding: 24px 24px 8px 24px;
  display: flex;
  flex-direction: column;
  margin-top: 0;
`

const GalleryImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
  border: 1.5px solid #e0e0e0;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
`

const ImagePanel = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 24px 32px;
  min-width: 350px;
  max-width: 500px;
  min-height: 350px;
`

const ProductImg = styled.img`
  max-width: 350px;
  width: 100%;
  border-radius: 12px;
  object-fit: contain;
  background: #f2f2f2;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 8px;
  color: #222;
  font-weight: 700;
  letter-spacing: 0.01em;
`

const Price = styled.div`
  font-size: 1.7rem;
  color: #0071dc;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: baseline;
  gap: 12px;
`

const OldPrice = styled.span`
  font-size: 1rem;
  color: #888;
  text-decoration: line-through;
`

const Description = styled.p`
  font-size: 1.1rem;
  color: #444;
  margin: 12px 0 0 0;
`

const AddToCartBtn = styled.button`
  background: #0071dc;
  color: #fff;
  border: none;
  border-radius: 22px;
  padding: 12px 32px;
  font-size: 1.08rem;
  font-weight: 600;
  margin: 18px 0 0 0;
  cursor: pointer;
  transition: background 0.2s;
  width: fit-content;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  &:hover {
    background: #005fa3;
  }
`

const ReviewTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #222;
  font-weight: 700;
`

const initialForm = {
  author: '',
  title: '',
  text: '',
  rating: 5,
}

const imageMap = {
  '/assets/bike.jpg': bikeImage,
  '/assets/sofa.jpeg': sofaImage,
}

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`)
        setProduct(res.data.product)
        setReviews(res.data.product.reviews)
      } catch (err) {
        console.error('Failed to load product', err)
      }
    }

    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  console.log(product)
  const handleRating = (r) => setForm((prev) => ({ ...prev, rating: r }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await axios.post(
        `http://localhost:5000/api/products/${id}/reviews`,
        {
          author: form.author || 'Anonymous',
          title: form.title,
          text: form.text,
          rating: Number(form.rating),
        }
      )
      const newReview = res.data.review
      setReviews([newReview, ...reviews])
      setForm(initialForm)
      console.log('🧠 ML Prediction:', newReview.ml_prediction)
    } catch (err) {
      console.error('Review submission failed:', err)
      alert('Failed to submit review. Try again.')
    }

    setSubmitting(false)
  }

  const fallbackImg = '/assets/placeholder.png'; // Place a placeholder image in public/assets/

  if (!product) return <p>Loading product...</p>  
  console.log('Product:', product)

  return (
    <FlexContainer>
      <GallerySection>
        {[0, 1, 2, 3].map((i) => (
          <GalleryImage
            key={i}
            src={imageMap[product.image] || product.image}
            alt={`View ${i + 1}`}
          />
        ))}
      </GallerySection>
      
      <ImagePanel>
        <ProductImg
          src={imageMap[product.image] || product.image}
          alt={product.title}
        />
      </ImagePanel>

      <DetailsSection>
        <Title>{product.title}</Title>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontWeight: 600, color: '#555' }}>Brand:</span> {product.brand}
          <span style={{ fontWeight: 600, color: '#555' }}>Color:</span> {product.color}
        </div>
        <Price>
          ${product.newPrice}
          <OldPrice>${product.oldPrice}</OldPrice>
        </Price>
        <AddToCartBtn>Add to Cart</AddToCartBtn>
        <Description>{product.description}</Description>
      </DetailsSection>

      <ReviewsSectionFlex>
        <ReviewTitle>Customer Reviews</ReviewTitle>
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: 24,
            background: '#f8f8f8',
            borderRadius: 8,
            padding: '18px 20px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
            maxWidth: 600,
          }}
        >
          <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Your name"
              style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Review title"
              style={{ flex: 2, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>
          <textarea
            name="text"
            value={form.text}
            onChange={handleChange}
            placeholder="Write your review..."
            rows={3}
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              marginBottom: 10,
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>Rating:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ cursor: 'pointer' }} onClick={() => handleRating(i + 1)}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 20 20"
                  fill={i < form.rating ? '#f7b500' : '#ccc'}
                >
                  <polygon points="10,1 12.59,7.36 19.51,7.64 14.18,12.14 15.97,18.96 10,15.27 4.03,18.96 5.82,12.14 0.49,7.64 7.41,7.36" />
                </svg>
              </span>
            ))}
          </div>
          <button
            type="submit"
            disabled={submitting}
            style={{
              background: '#0071dc',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '8px 28px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            {submitting ? 'Adding...' : 'Add Review'}
          </button>
        </form>

        {reviews.length === 0 && <p>No reviews yet.</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {reviews.map((review, idx) => (
            <div key={idx} style={{ marginBottom: '12px' }}>
              <ReviewCard
                author={review.author}
                date={review.date}
                title={review.title}
                text={review.text}
                rating={review.rating}
                helpfulCount={review.helpfulCount}
                notHelpfulCount={review.notHelpfulCount}
              />
              {review?.is_flagged && (
                <p style={{ color: 'red', fontSize: '0.9rem', marginLeft: 10 }}>
                  ⚠️ This review was flagged as <strong>potentially fake</strong>.
                </p>
              )}
            </div>
          ))}
        </div>
      </ReviewsSectionFlex>
    </FlexContainer>
  )
}

export default ProductDetails