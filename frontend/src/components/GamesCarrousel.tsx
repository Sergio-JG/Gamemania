import { useState, useEffect, CSSProperties } from 'react';

const Carousel = () => {

    const images = [
        '../../public/images/games/Cyberpunk2077.jpg',
        '../../public/images/games/Fortnite.jpg',
        '../../public/images/games/AmongUs.jpg',
        '../../public/images/games/TheLegendOfZeldaBreathOfTheWild.jpg',
        '../../public/images/games/CallOfDutyWarzone.jpg',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(true);
            }, 350);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const imageStyle: CSSProperties = {
        width: '100%',
        height: '600px',
        objectFit: 'cover',
        transition: 'opacity 0.5s ease-in-out',
        opacity: fade ? 1 : 0
    };

    return (
        <div className="carousel">
            <img
                src={images[currentImageIndex]}
                alt="Carousel Image"
                style={imageStyle}
            />
        </div>
    );
};

export default Carousel;