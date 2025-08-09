import React, { useRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

// Main App component
const App = () => {
  const sections = [
    { id: 'home', title: 'Home', component: <HomePage /> },
    { id: 'about', title: 'About Us', component: <AboutPage /> },
    { id: 'services', title: 'Our Services', component: <ServicesPage /> },
    { id: 'pricing', title: 'Pricing', component: <PricingPage /> },
  ];

  // Custom CSS for animations and holographic effects
  const style = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

    body {
      font-family: 'Poppins', sans-serif;
      overflow-x: hidden;
    }

    .glass-card {
      backdrop-filter: blur(20px);
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .holographic-gradient {
      background: linear-gradient(
        45deg,
        #00aaff,
        #ff00aa,
        #f0ff00,
        #00aaff
      );
      background-size: 400% 400%;
      animation: gradient-animation 15s ease infinite;
    }

    .text-holographic-gradient {
      background: linear-gradient(
        45deg,
        #00aaff,
        #ff00aa,
        #f0ff00
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @keyframes gradient-animation {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
      animation: fadeIn 0.8s ease-out forwards;
      opacity: 0;
    }
  `;

  // Inject the CSS into the document head
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.textContent = style;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div className="relative min-h-screen text-white bg-gray-900 overflow-x-hidden">
      {/* Holographic animated background */}
      <div className="absolute inset-0 holographic-gradient opacity-20"></div>

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="relative z-10 flex items-center justify-center min-h-screen p-8 lg:p-16"
        >
          {section.component}
        </section>
      ))}
    </div>
  );
};

// --- Page Components ---

const HomePage = () => (
  <div className="text-center fade-in">
    <h1 className="text-4xl md:text-7xl font-bold mb-4 text-holographic-gradient">
      Crafting Digital Excellence
    </h1>
    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
      We design and build breathtaking digital experiences with an emphasis on clarity, elegance, and visionary technology.
    </p>
    <div className="flex justify-center space-x-4">
      <a href="#services" className="px-8 py-3 rounded-full font-semibold text-white holographic-gradient transition-all duration-300 hover:scale-105">
        Explore Services
      </a>
      <a href="#about" className="px-8 py-3 rounded-full font-semibold text-white border-2 border-white/20 transition-all duration-300 hover:bg-white/10">
        Learn More
      </a>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="max-w-4xl glass-card rounded-3xl p-8 md:p-12 fade-in">
    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-holographic-gradient">
      Our Vision
    </h2>
    <p className="text-gray-300 text-lg mb-6">
      Our mission is to bridge the gap between imagination and reality by crafting digital solutions that are not just functional but truly inspire. We believe in a future where technology is a seamless extension of human creativity.
    </p>
    <p className="text-gray-300 text-lg">
      Founded on the principles of innovation and elegance, our team of designers and developers are dedicated to building a new standard of digital artistry.
    </p>
  </div>
);

const ServicesPage = () => (
  <div className="max-w-6xl w-full fade-in">
    <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-holographic-gradient">
      Services We Offer
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ServiceCard
        title="Bespoke Design"
        description="Crafting custom, high-fidelity UI/UX designs that elevate your brand and engage your audience."
      />
      <ServiceCard
        title="Advanced Development"
        description="Building scalable and secure web applications with modern frameworks and cutting-edge technology."
      />
      <ServiceCard
        title="Brand Experience"
        description="Developing a cohesive digital identity that resonates with your values and captivates your customers."
      />
      <ServiceCard
        title="3D & Motion Graphics"
        description="Integrating stunning 3D models and smooth animations to bring your digital presence to life."
      />
      <ServiceCard
        title="Strategic Consulting"
        description="Providing expert guidance to define your digital strategy and achieve your business goals."
      />
      <ServiceCard
        title="Performance Optimization"
        description="Ensuring your application is fast, responsive, and provides a flawless user experience."
      />
    </div>
  </div>
);

const ServiceCard = ({ title, description }) => (
  <div className="glass-card rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/30 cursor-pointer">
    <h3 className="text-2xl font-semibold mb-2 text-white">
      {title}
    </h3>
    <p className="text-gray-400">{description}</p>
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

  // Default prices are in ZAR
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
    return (total * conversionRate).toFixed(2);
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  const getPlanDescription = (plan) => {
    switch(plan) {
      case 'basic':
        return 'Ideal for startups needing a stunning digital presence.';
      case 'standard':
        return 'Our most popular option for growing businesses looking for advanced features.';
      case 'premium':
        return 'For enterprise clients who require custom, complex, and high-performance solutions.';
      default:
        return '';
    }
  };

  const formatCurrency = (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return `${currencySymbol}0.00`;
    return `${currencySymbol}${numericAmount.toLocaleString('en-ZA')}`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 glass-card rounded-3xl w-full max-w-md text-center fade-in">
        <h2 className="text-3xl font-bold mb-4 text-holographic-gradient">
          Loading...
        </h2>
        <p className="text-gray-300">Fetching local currency rates for a tailored quote.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full glass-card rounded-3xl p-8 md:p-12 fade-in">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-holographic-gradient">
        Interactive Quote Builder
      </h2>
      <p className="text-center text-gray-300 text-lg mb-8">
        Prices are displayed in your local currency ({currency}). Select a base plan and customize your features to get an instant estimate.
      </p>

      <div className="w-full mb-8">
        <h3 className="text-2xl font-bold mb-4">1. Choose a Plan</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {['basic', 'standard', 'premium'].map(plan => (
            <button
              key={plan}
              onClick={() => setSelectedPlan(plan)}
              className={twMerge(
                "p-6 rounded-3xl transition-all duration-300 text-left glass-card",
                selectedPlan === plan ? "holographic-gradient shadow-xl" : "hover:bg-white/10"
              )}
            >
              <h4 className="text-xl font-bold capitalize">{plan}</h4>
              <p className="text-gray-400 text-sm">{getPlanDescription(plan)}</p>
              <span className="text-3xl font-bold mt-4 block">{formatCurrency(basePrices[plan] * conversionRate)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full mb-8">
        <h3 className="text-2xl font-bold mb-4">2. Add-on Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(featurePrices).map(([feature, price]) => (
            <label
              key={feature}
              htmlFor={feature}
              className={twMerge(
                "flex items-center justify-between p-4 rounded-3xl cursor-pointer transition-all duration-300 glass-card",
                selectedFeatures[feature] ? "bg-white/10" : "hover:bg-white/5"
              )}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={feature}
                  checked={selectedFeatures[feature]}
                  onChange={() => handleFeatureToggle(feature)}
                  className="mr-3 w-5 h-5 appearance-none rounded border border-white/30 checked:bg-holographic-gradient checked:border-transparent transition-all duration-200"
                />
                <div className="flex flex-col">
                  <span className="text-lg capitalize text-white">{feature.replace('-', ' ')}</span>
                  <span className="text-sm text-gray-400">Add an extra {formatCurrency(price * conversionRate)}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full p-8 rounded-3xl glass-card">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <span className="text-3xl md:text-4xl font-bold text-white">Total Estimate:</span>
          <span className="text-4xl md:text-5xl font-bold text-holographic-gradient">
            {formatCurrency(calculateTotal())}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Page Components End ---

export default App;
