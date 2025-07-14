import bikeImage from '../assets/bike.jpg'
import sofa from '../assets/sofa.jpeg'

const reviewAuthors = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
const reviewComments = [
  'Great product!',
  'Very satisfied.',
  'Could be better.',
  'Highly recommend.',
  'Not worth the price.',
  'Excellent quality.',
]

export const generateReviews = (count) =>
  Array.from({ length: count }, () => ({
    author: reviewAuthors[Math.floor(Math.random() * reviewAuthors.length)],
    rating: Math.floor(Math.random() * 5) + 1, 
    comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
  }))

export const generateProducts = (count, startId = 1) =>
  Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    image: i % 2 ? bikeImage : sofa,
    newPrice: (Math.random() * 500 + 50).toFixed(2),
    oldPrice: (Math.random() * 1000 + 200).toFixed(2),
    title: `Random Product ${startId + i}`,
    reviews: generateReviews(Math.floor(Math.random() * 5) + 1),
  }))
