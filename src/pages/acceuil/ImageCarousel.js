import React from 'react';
import { Carousel } from 'react-bootstrap';

const BannerCarousel = () => (
  <Carousel>
    <Carousel.Item>
      <div style={{ backgroundImage: 'url("https://www.contremarque.com/wp-content/uploads/2022/04/damso-qalf-concert-clermont.jpg")', height: '200px', backgroundSize: 'contain', backgroundPosition: 'center' }}>
        <div className="carousel-caption d-none d-md-block">
        </div>
      </div>
    </Carousel.Item>
    <Carousel.Item>
      <div style={{ backgroundImage: 'url("https://lyon.citycrunch.fr/wp-content/uploads/sites/3/2023/10/banniere-tournee-europe-groupe-de-metal-800x235.jpg")', height: '200px', backgroundSize: 'contain', backgroundPosition: 'center' }}>
        <div className="carousel-caption d-none d-md-block">
        </div>
      </div>
    </Carousel.Item>
    <Carousel.Item>
      <div style={{ backgroundImage: 'url("https://i.pinimg.com/originals/3d/30/c5/3d30c53b67a390705fbe6da81c9c2ca2.jpg")', height: '200px', backgroundSize: 'contain', backgroundPosition: 'center' }}>
        <div className="carousel-caption d-none d-md-block">
        </div>
      </div>
    </Carousel.Item>
  </Carousel>
);

export default BannerCarousel;
