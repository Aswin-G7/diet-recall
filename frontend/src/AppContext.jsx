import React, { createContext, useContext, useState, useEffect } from 'react';

// Default profile structure matching your requirements
const DEFAULT_PROFILE = {
  name: '',
  age: '',
  weight: '',
  height: '',
  dietType: 'Balanced',
  goal: 'maintain',
  dailyCalorieTarget: 2500,
  // We keep this object structure for the UI, but we will convert 
  // it to an array when sending to your backend.
  healthConditions: {
    thyroid: false,
    diabetes: false,
    bp: false,
  },
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loggedEntries, setLoggedEntries] = useState([]);
  
  // Load profile from local storage on boot
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile'); // Changed to match your old key name if you prefer
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  // Save to local storage whenever profile changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const updateProfile = (profile) => {
    setUserProfile(profile);
  };

  const addEntry = (food, mealType) => {
    const newEntry = {
      id: Math.random().toString(36).substr(2, 9),
      foodId: food.id,
      name: food.name,
      calories: food.calories,
      macros: { protein: food.protein, carbs: food.carbs, fat: food.fat },
      mealType,
      timestamp: new Date(),
    };
    setLoggedEntries(prev => [...prev, newEntry]);
  };

  const removeEntry = (id) => {
    setLoggedEntries(prev => prev.filter(e => e.id !== id));
  };

  const isSameDay = (d1, d2) => {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  };

  const getConsumedForDate = (date) => {
    const entrySum = loggedEntries
      .filter(e => isSameDay(new Date(e.timestamp), date))
      .reduce((sum, e) => sum + e.calories, 0);
    
    return entrySum;
  };

  const consumedToday = getConsumedForDate(new Date());
  const dailyGoal = userProfile.dailyCalorieTarget || 2000;

  return (
    <AppContext.Provider value={{ 
      loggedEntries, 
      addEntry, 
      removeEntry, 
      userProfile, 
      updateProfile, 
      dailyGoal, 
      consumedToday, 
      getConsumedForDate 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};