import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import TechStack from './components/TechStack';
import FeaturedProjects from './components/FeaturedProjects';
import RecentArticles from './components/RecentArticles';
import CTA from './components/CTA';
import SEO from '../../components/shared/SEO';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <Navbar />
            <main>
                <SEO
                    title="Home"
                    description="Portfolio of Nafisat, a Software Engineer and Technical Writer specializing in distributed systems and backend development."
                />
                <Hero />
                <Services />
                <TechStack />
                <FeaturedProjects />
                <RecentArticles />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
