const dummyReviews = [
  {
    rating: 4.5,
    reviewCount: 120,
    businessName: 'Cafe Delight',
    reviewText: 'Great coffee and friendly staff!',
    reviewerName: 'Alice Johnson',
  },
  {
    rating: 3.8,
    reviewCount: 75,
    businessName: 'Book Nook',
    reviewText: 'A cozy place with a good selection of books.',
    reviewerName: 'Bob Smith',
  },
  {
    rating: 5.0,
    reviewCount: 200,
    businessName: 'Pizza Palace',
    reviewText: 'Best pizza in town! Highly recommend.',
    reviewerName: 'Charlie Brown',
  },
  {
    rating: 2.1,
    reviewCount: 50,
    businessName: 'Fashion Hub',
    reviewText: 'Not very impressed with the selection.',
    reviewerName: 'Diana Prince',
  },
  {
    rating: 4.0,
    reviewCount: 90,
    businessName: 'Gym Central',
    reviewText: 'Clean and well-maintained gym facilities.',
    reviewerName: 'Ethan Hunt',
  },
];
import { GoogleReviewCard } from './review-card';

export function ReviewList() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4 gap-2'>
      {dummyReviews.map((review, index) => (
        <GoogleReviewCard
          key={index}
          rating={review.rating}
          reviewCount={review.reviewCount}
          businessName={review.businessName}
          reviewText={review.reviewText}
          reviewerName={review.reviewerName}
        />
      ))}
    </div>
  );
}
