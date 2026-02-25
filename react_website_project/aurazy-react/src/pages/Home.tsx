import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';

// Import Assets
import headerImg from '../assets/IMG_2683.PNG';
import banner1 from '../assets/banner-1.png';
import banner2 from '../assets/banner-2.png';
import banner3 from '../assets/banner-3.png';
import banner4 from '../assets/banner-4.png';
import banner5 from '../assets/banner-5.png';
import banner6 from '../assets/banner-6.png';
import banner7 from '../assets/banner-7.png';
import banner8 from '../assets/banner-8.png';
import arrival1 from '../assets/IMG_2689.PNG';
import arrival2 from '../assets/IMG_2690.PNG';
import arrival3 from '../assets/IMG_2692.PNG';

const Home: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };

    const sr = ScrollReveal();

    sr.reveal(".header__image img", {
      ...scrollRevealOption,
      origin: "right" as any,
    });
    sr.reveal(".header__content h1", {
      ...scrollRevealOption,
      delay: 500,
    });
    sr.reveal(".header__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    sr.reveal(".header__btns", {
      ...scrollRevealOption,
      delay: 1500,
    });

    sr.reveal(".arrival__card", {
      ...scrollRevealOption,
      interval: 500,  
    });

    sr.reveal(".sale__image img", {
      ...scrollRevealOption,
      origin: "left" as any,
    });
    sr.reveal(".sale__content h2", {
      ...scrollRevealOption,
      delay: 500,
    });
    sr.reveal(".sale__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    sr.reveal(".sale__content h4", {
      ...scrollRevealOption,
      delay: 1000,
    });
    sr.reveal(".sale__btn", {
      ...scrollRevealOption,
      delay: 1500,
    });

    sr.reveal(".favourite__card", {
      ...scrollRevealOption,
      interval: 500,
    });

    // Banner duplication for infinite scroll
    if (bannerRef.current) {
      const bannerContent = Array.from(bannerRef.current.children);
      bannerContent.forEach((item) => {
        const duplicateNode = item.cloneNode(true) as HTMLElement;
        duplicateNode.setAttribute("aria-hidden", "true");
        bannerRef.current?.appendChild(duplicateNode);
      });
    }

    return () => sr.destroy();
  }, []);

  return (
    <div className="home-page">
      <header>
        <div className="section__container header__container">
          <div className="header__content">
            <h1>
              <span>LET'S</span>
              <br />
              EXPLORE
              <br />
              <span>UNIQUE</span>
              <br />
              CLOTHES.
            </h1>
            <p>Live for influential and innovative fashion!</p>
            <div className="header__btns">
              <button className="btn">Shop Now</button>
              <a href="https://wa.me/7999939085?text=Hey!%20I%20visited%20your%20fashion%20website%20and%20want%20to%20connect%20with%20you!" target="_blank" rel="noopener noreferrer">
                <button className="btn whatsapp-btn">
                  <i className="ri-whatsapp-line"></i> Chat on WhatsApp
                </button>
              </a>
            </div>
          </div>
          <div className="header__image">
            <img src={headerImg} alt="header" />
          </div>
        </div>
      </header>

      <section className="banner">
        <div className="banner__container" ref={bannerRef}>
          <img src={banner1} alt="banner" />
          <img src={banner2} alt="banner" />
          <img src={banner3} alt="banner" />
          <img src={banner4} alt="banner" />
          <img src={banner5} alt="banner" />
          <img src={banner6} alt="banner" />
          <img src={banner7} alt="banner" />
          <img src={banner8} alt="banner" />
        </div>
      </section>

      <section className="section__container arrival__container" id="catalogue">
        <h2 className="section__header">NEW ARRIVALS</h2>
        <div className="arrival__grid">
          <div className="arrival__card">
            <div className="arrival__image">
              <Link to="/collection">
                <img src={arrival1} alt="arrival" />
              </Link>
            </div>
            <div className="arrival__content">
              <div>
                <h4>Hoodies & Sweatshirts</h4>
                <Link to="/collection">Explore Now</Link>
              </div>
              <span><i className="ri-arrow-right-line"></i></span>
            </div>
          </div>
          <div className="arrival__card">
            <div className="arrival__image">
              <Link to="/collection?type=coats">
                <img src={arrival2} alt="arrival" />
              </Link>
            </div>
            <div className="arrival__content">
              <div>
                <h4>Coats & Parkas</h4>
                <Link to="/collection?type=coats">Explore Now</Link>
              </div>
              <span><i className="ri-arrow-right-line"></i></span>
            </div>
          </div>
          <div className="arrival__card">
            <div className="arrival__image">
              <Link to="/collection?type=tees">
                <img src={arrival3} alt="arrival" />
              </Link>
            </div>
            <div className="arrival__content">
              <div>
                <h4>Tees & T-Shirt</h4>
                <Link to="/collection?type=tees">Explore Now</Link>
              </div>
              <span><i className="ri-arrow-right-line"></i></span>
            </div>
          </div>
        </div>
      </section>

      <section className="sale" id="fashion">
        <div className="section__container sale__container">
          <div className="sale__image">
            <img src={headerImg} alt="sale" />
          </div>
          <div className="sale__content">
            <h2><span>Big Offer Coming Soon!</span><br/></h2>
            <p>
              Stay tuned for our next fashion sale — exclusive discounts and new arrivals waiting for you!
            </p>
            <h4>*Join our WhatsApp community to get early access*</h4>
            <p>*Terms and conditions apply</p>
            <a href="https://wa.me/7999939085?text=Hey!%20I%20want%20early%20access%20to%20your%20next%20sale!" target="_blank" rel="noopener noreferrer">
              <button className="btn whatsapp-btn">Notify Me on WhatsApp</button>
            </a>
          </div>
        </div>
      </section>

      <section className="section__container favourite__container" id="favourite">
        <h2 className="section__header">YOUNG'S FAVOURITE</h2>
        <div className="favourite__grid">
          <div className="favourite__card">
            <div className="favourite__image">
              <img src={arrival1} alt="favourite" />
            </div>
            <div className="favourite__content">
              <div>
                <h4>Trending on Instagram</h4>
                <a href="#">Explore Now</a>
              </div>
              <span><i className="ri-arrow-right-line"></i></span>
            </div>
          </div>
          <div className="favourite__card">
            <div className="favourite__image">
              <img src={arrival2} alt="favourite" />
            </div>
            <div className="favourite__content">
              <div>
                <h4>All under $40</h4>
                <a href="#">Explore Now</a>
              </div>
              <span><i className="ri-arrow-right-line"></i></span>
            </div>
          </div>
        </div>
      </section>

      <section className="promo">
        <div className="section__container promo__container">
          <h2 className="section__header">
            JOIN SHOPPING COMMUNITY TO GET MONTHLY PROMO
          </h2>
          <p>Type your email down below and be young wild generation</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Add your email here" />
            <button className="btn">SEND</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
