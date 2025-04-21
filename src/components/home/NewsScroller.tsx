import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  source: string;
  link: string;
}

const NewsScroller: React.FC = () => {
  // Mock news data (in a real app, this would come from an API)
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Global Carbon Emissions Drop 7% in 2020 Due to COVID-19 Lockdowns",
      date: "May 10, 2023",
      source: "Environmental Science Journal",
      link: "#"
    },
    {
      id: 2,
      title: "New Study Shows Benefits of Electric Vehicles in Urban Areas",
      date: "May 15, 2023",
      source: "Green Energy Today",
      link: "#"
    },
    {
      id: 3,
      title: "EU Announces New Carbon Tax for Imported Goods",
      date: "May 18, 2023",
      source: "European Climate News",
      link: "#"
    },
    {
      id: 4,
      title: "Reforestation Efforts Show Promising Results in Amazon Region",
      date: "May 22, 2023",
      source: "Conservation Weekly",
      link: "#"
    },
    {
      id: 5,
      title: "Scientists Develop New Carbon Capture Technology",
      date: "May 25, 2023",
      source: "Tech & Environment",
      link: "#"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const nextNews = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  };

  const prevNews = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
  };

  // Auto scroll effect
  useEffect(() => {
    let interval: number | undefined;
    
    if (autoScroll) {
      interval = window.setInterval(() => {
        nextNews();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoScroll]);

  return (
    <div className="bg-secondary-800 text-white py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex items-center bg-secondary-700 px-3 py-1 rounded-md mr-4">
            <Newspaper size={16} className="mr-2" />
            <span className="text-sm font-semibold">Environmental News</span>
          </div>
          
          <button 
            onClick={prevNews} 
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
            className="p-1 rounded-full hover:bg-secondary-700 transition-colors"
            aria-label="Previous news"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div 
            className="flex-1 overflow-hidden mx-2"
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
          >
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
              <a 
                href={newsItems[currentIndex].link}
                className="text-sm hover:text-primary-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-medium">{newsItems[currentIndex].title}</span>
                <span className="text-secondary-400 ml-2">
                  | {newsItems[currentIndex].date} | Source: {newsItems[currentIndex].source}
                </span>
              </a>
            </div>
          </div>
          
          <button 
            onClick={nextNews}
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
            className="p-1 rounded-full hover:bg-secondary-700 transition-colors"
            aria-label="Next news"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsScroller;