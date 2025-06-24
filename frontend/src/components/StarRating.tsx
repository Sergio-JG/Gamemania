import Star from '@mui/icons-material/Star';
import StarHalf from '@mui/icons-material/StarHalf';
import StarBorder from '@mui/icons-material/StarBorder';

const StarRating = ({ score }: { score: number }) => {

    const totalStars = 5;
    const fullStars = Math.floor(score);
    const halfStar = (score % 1) >= 0.5 ? 1 : 0;
    const emptyStars = totalStars - fullStars - halfStar;

    return (
        <>
            {Array(fullStars).fill(<Star color="primary" />)}
            {halfStar > 0 && <StarHalf color="primary" />}
            {Array(emptyStars).fill(<StarBorder color="primary" />)}
        </>
    );
};

export default StarRating