import React, { useRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

// Helper function to create a glitch effect on a string
const glitchText = (text, progress) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:",.<>/?';
  const glitchLength = Math.floor(progress * text.length);
  const glitchedChars = [];
  for (let i = 0; i < glitchLength; i++) {
    glitchedChars.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return glitchedChars.join('') + text.substring(glitchLength);
};

// Main App component
const App = () => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to handle the horizontal scroll event
  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  // Set up the scroll event listener
  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => {
        element.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const sections = [
    { id: 'home', title: 'Home', component: <HomePage /> },
    { id: 'about', title: 'About', component: <AboutPage /> },
    { id: 'services', title: 'Services', component: <ServicesPage /> },
    { id: 'pricing', title: 'Pricing', component: <PricingPage /> },
  ];

  return (
    <div className="bg-glitch-hues text-neutral-50 font-inter min-h-screen">
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll snap-x snap-mandatory h-screen w-screen hide-scrollbar"
      >
        {sections.map((section, index) => {
          const isNextSectionVisible =
            scrollPosition > index * window.innerWidth - (window.innerWidth / 3) &&
            scrollPosition < (index + 1) * window.innerWidth;

          // Calculate the progress of the transition for the glitch effect
          const transitionProgress = isNextSectionVisible
            ? Math.max(0, (scrollPosition - (index * window.innerWidth - (window.innerWidth / 3))) / (window.innerWidth / 3))
            : 0;
          
          const nextSectionTitle = sections[index + 1] ? sections[index + 1].title : '';
          const glitchedNextTitle = glitchText(nextSectionTitle, transitionProgress);

          return (
            <div
              key={section.id}
              id={section.id}
              className="relative flex-shrink-0 w-screen h-full snap-center"
            >
              {/* This is the main content area for each section */}
              <div className="p-12 h-full overflow-y-auto">
                {section.component}
              </div>

              {/* The overlapping title for the next section */}
              {isNextSectionVisible && sections[index + 1] && (
                <div
                  style={{
                    opacity: transitionProgress,
                    transform: `translateX(${-scrollPosition + (index * window.innerWidth)}px)`,
                  }}
                  className="absolute top-1/2 left-[calc(100vw-10vw)] -translate-y-1/2 text-9xl font-bold text-neutral-800 transition-all duration-300 pointer-events-none"
                >
                  <span className="text-transparent font-glitch" style={{ WebkitTextStroke: '2px rgb(0, 255, 255, 0.5)', opacity: transitionProgress }}>
                    {glitchedNextTitle}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Page Components ---

const HeroSection = ({ title, subtitle, buttons }) => (
  <div className="flex flex-col items-start justify-center h-full max-w-2xl px-8">
    <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-fade-in-up font-glitch text-cyan-400">
      {title}
    </h1>
    <p className="text-xl md:text-2xl text-neutral-400 mb-8 animate-fade-in-up-delay-1">
      {subtitle}
    </p>
    <div className="flex space-x-4 animate-fade-in-up-delay-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={twMerge(
            "px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide",
            button.className
          )}
        >
          {button.text}
        </button>
      ))}
    </div>
  </div>
);

const HomePage = () => (
  <HeroSection
    title="Design the Future"
    subtitle="We are a digital agency specializing in futuristic web experiences and cutting-edge design."
    buttons={[
      { text: "Get Started", className: "bg-cyan-600 text-white hover:bg-cyan-700 transition" },
      { text: "Learn More", className: "bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition" },
    ]}
  />
);

const AboutPage = () => (
  <div className="flex flex-col items-start justify-center h-full max-w-3xl px-8">
    <h2 className="text-4xl md:text-6xl font-bold mb-4 font-glitch text-cyan-400">Our Mission</h2>
    <p className="text-lg md:text-xl text-neutral-400 mb-8">
      To push the boundaries of digital design, creating immersive and intuitive experiences that connect people to technology in meaningful new ways. We believe in a future where user interfaces are not just functional, but truly a work of art.
    </p>
    <h3 className="text-3xl md:text-4xl font-bold mb-4 font-glitch text-cyan-400">Our Vision</h3>
    <p className="text-lg md:text-xl text-neutral-400">
      To be a leading force in the next generation of web development, shaping the digital landscape with innovative solutions and a relentless pursuit of excellence.
    </p>
  </div>
);

const ServicesPage = () => (
  <div className="flex flex-col h-full items-start px-8 py-12 md:py-24 max-w-4xl">
    <h2 className="text-4xl md:text-6xl font-bold mb-8 font-glitch text-cyan-400">What We Do</h2>
    <div className="grid md:grid-cols-2 gap-8">
      <ServiceCard
        title="Web Development"
        description="Crafting bespoke websites and web applications with a focus on performance, scalability, and security."
      />
      <ServiceCard
        title="UI/UX Design"
        description="Designing intuitive, user-centric interfaces that are not only beautiful but also a joy to use."
      />
      <ServiceCard
        title="Digital Strategy"
        description="Developing a clear and actionable digital roadmap to help your business achieve its goals and reach new audiences."
      />
      <ServiceCard
        title="Brand Identity"
        description="Building a strong, cohesive brand identity that resonates with your target market and sets you apart from the competition."
      />
    </div>
  </div>
);

const ServiceCard = ({ title, description }) => (
  <div className="bg-neutral-900 rounded-2xl p-6 transition-all duration-300 hover:bg-neutral-800">
    <h3 className="text-2xl font-bold mb-2 font-glitch text-cyan-400">{title}</h3>
    <p className="text-neutral-400">{description}</p>
  </div>
);

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [selectedFeatures, setSelectedFeatures] = useState({
    'custom-components': false,
    'ai-integration': false,
    'full-seo': false,
    'advanced-analytics': false,
  });

  const [currency, setCurrency] = useState('ZAR');
  const [currencySymbol, setCurrencySymbol] = useState('R');
  const [conversionRate, setConversionRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Default prices are now in ZAR
  const basePrices = {
    basic: 5000,
    standard: 12000,
    premium: 25000,
  };

  const featurePrices = {
    'custom-components': 3000,
    'ai-integration': 5000,
    'full-seo': 2500,
    'advanced-analytics': 1500,
  };

  // Effect to fetch user's location and currency conversion rate
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        setIsLoading(true);
        // Fetch user's IP-based location and currency
        const ipInfoResponse = await fetch('https://ipapi.co/json/');
        const ipInfo = await ipInfoResponse.json();
        const userCurrency = ipInfo.currency || 'ZAR'; // Fallback to ZAR if detection fails
        const userCurrencySymbol = ipInfo.currency_symbol || 'R'; // Fallback to R if detection fails

        if (userCurrency !== 'ZAR') {
          // Fetch conversion rate if the user's currency is not the default ZAR
          const conversionResponse = await fetch(`https://api.frankfurter.app/latest?from=ZAR&to=${userCurrency}`);
          const conversionData = await conversionResponse.json();
          const rate = conversionData.rates[userCurrency];
          if (rate) {
            setConversionRate(rate);
            setCurrency(userCurrency);
            setCurrencySymbol(userCurrencySymbol);
          }
        }
      } catch (error) {
        console.error('Error fetching currency data:', error);
        // Fallback to default ZAR and display error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrency();
  }, []);

  const calculateTotal = () => {
    let total = basePrices[selectedPlan];
    for (const feature in selectedFeatures) {
      if (selectedFeatures[feature]) {
        total += featurePrices[feature];
      }
    }
    // Apply the conversion rate to the total
    return (total * conversionRate).toFixed(2);
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  const getPlanDescription = (plan) => {
    switch(plan) {
      case 'basic':
        return 'Ideal for startups and small businesses needing a strong online presence.';
      case 'standard':
        return 'Our most popular option for growing businesses looking for more functionality.';
      case 'premium':
        return 'For enterprise-level clients who require custom, complex, and high-performance solutions.';
      default:
        return '';
    }
  };

  // Helper function for formatting currency
  const formatCurrency = (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return `${currencySymbol}0.00`;
    return `${currencySymbol}${numericAmount.toLocaleString('en-ZA')}`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 py-12 md:py-24 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 font-glitch text-cyan-400">Loading Pricing...</h2>
        <p className="text-lg md:text-xl text-neutral-400">Fetching local currency rates.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-12 md:py-24 h-full max-w-4xl mx-auto overflow-y-auto hide-scrollbar">
      <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center font-glitch text-cyan-400">Interactive Quote Builder</h2>
      <p className="text-lg md:text-xl text-neutral-400 mb-12 text-center">
        Prices are displayed in your local currency ({currency}). Select a base plan and customize your features to get an instant estimate.
      </p>

      {/* Plan Selection */}
      <div className="w-full mb-12">
        <h3 className="text-2xl font-bold mb-4 font-glitch text-cyan-400">1. Choose a Plan</h3>
        <div className="flex flex-col md:flex-row gap-4">
          {['basic', 'standard', 'premium'].map(plan => (
            <button
              key={plan}
              onClick={() => setSelectedPlan(plan)}
              className={twMerge(
                "flex-1 p-6 rounded-2xl transition-all duration-300 text-left",
                selectedPlan === plan ? "bg-cyan-600 text-white scale-105" : "bg-neutral-900 text-neutral-200 hover:bg-neutral-800"
              )}
            >
              <h4 className="text-xl font-bold capitalize font-glitch text-cyan-400">{plan}</h4>
              <p className="text-neutral-400 text-sm">{getPlanDescription(plan)}</p>
              <span className="text-3xl font-bold mt-4 block">{formatCurrency(basePrices[plan] * conversionRate)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Selection */}
      <div className="w-full mb-12">
        <h3 className="text-2xl font-bold mb-4 font-glitch text-cyan-400">2. Add-on Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(featurePrices).map(([feature, price]) => (
            <label
              key={feature}
              htmlFor={feature}
              className={twMerge(
                "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300",
                selectedFeatures[feature] ? "bg-neutral-700" : "bg-neutral-900 hover:bg-neutral-800"
              )}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={feature}
                  checked={selectedFeatures[feature]}
                  onChange={() => handleFeatureToggle(feature)}
                  className="mr-3 w-5 h-5 text-cyan-600 bg-neutral-800 border-neutral-600 rounded focus:ring-cyan-500 focus:ring-2"
                />
                <div className="flex flex-col">
                  <span className="text-lg capitalize">{feature.replace('-', ' ')}</span>
                  <span className="text-sm text-neutral-400">Add an extra {formatCurrency(price * conversionRate)}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Total Display */}
      <div className="w-full p-8 bg-neutral-900 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold font-glitch text-cyan-400">Total Estimate:</span>
          <span className="text-5xl font-bold text-cyan-500">{formatCurrency(calculateTotal())}</span>
        </div>
        <p className="text-sm text-neutral-500 mt-2">
          *This is an estimate. A final quote will be provided after a detailed consultation.
        </p>
      </div>
    </div>
  );
};

// --- Page Components End ---

export default App;
