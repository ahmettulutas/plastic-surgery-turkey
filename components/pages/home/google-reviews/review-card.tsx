import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReviewCardProps {
  rating?: number;
  reviewCount: number;
  businessName: string;
  reviewText: string;
  reviewerName: string;
}

const StarRating = ({ rating }: { rating?: number }) => {
  const filledStars = Math.round(rating || 0);
  return (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= filledStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export function GoogleReviewCard({
  rating = 0,
  reviewCount,
  businessName,
  reviewText,
  reviewerName,
}: Readonly<ReviewCardProps>) {
  const displayRating = typeof rating === 'number' && !isNaN(rating) ? rating.toFixed(1) : 'N/A';

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{businessName}</CardTitle>
        <div className='flex items-center space-x-1'>
          <StarRating rating={rating} />
          <span className='text-sm text-muted-foreground'>{displayRating}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground mb-4'>{reviewCount} Google reviews</p>
        <blockquote className='border-l-4 border-muted pl-4 italic mb-2'>"{reviewText}"</blockquote>
        <p className='text-sm text-muted-foreground'>{reviewerName}</p>
      </CardContent>
    </Card>
  );
}
