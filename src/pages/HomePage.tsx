import React from 'react';
import HeroSection from '../components/home/HeroSection';
import NewsScroller from '../components/home/NewsScroller';
import TopContributors from '../components/home/TopContributors';
import ActivitiesSection from '../components/home/ActivitiesSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <NewsScroller />
      <ActivitiesSection />
      <TopContributors />
    </>
  );
};

export default HomePage;