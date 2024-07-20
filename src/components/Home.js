import React from 'react';
import Footer from './subcomponents/Footer';
import Video from './subcomponents/Video';
import About from './subcomponents/About';
import Icons from './subcomponents/Icons';
import Header from './subcomponents/Header';
import Products from './subcomponents/Products';

const Home = () => {
  return (
    <div>
        <Header />
        <Icons />
        <About />
        <Products backgroundColor="#D6EFD8" name='Products' padding='40px 0' />
        <Video />
        <Footer />
    </div>
  );
}

export default Home;