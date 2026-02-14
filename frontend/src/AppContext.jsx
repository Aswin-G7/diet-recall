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
  healthConditions: {
    thyroid: false,
    diabetes: false,
    bp: false,
  },
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loggedEntries, setLoggedEntries] = useState([]);
  
  // 1. Load profile from local storage on boot
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved && saved !== "undefined") {
      const parsed = JSON.parse(saved);
      // Only trust the cache if it's a REAL profile from the DB (has an _id or userId)
      if (parsed._id || parsed.userId) return parsed;
    }
    return DEFAULT_PROFILE;
  });

  // 2. 🚨 THE FIX: Fetch real profile from MongoDB on mount/login 🚨
  useEffect(() => {
    const fetchRealProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // Stop if not logged in

      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Use the secure VIP Pass
          }
        });

        if (res.ok) {
          const dbProfile = await res.json();
          
          // Data Converter: DB uses Array (["bp", "diabetes"]), UI uses Object {bp: true}
          let mappedConditions = { ...DEFAULT_PROFILE.healthConditions };
          if (Array.isArray(dbProfile.conditions)) {
            dbProfile.conditions.forEach(cond => {
              mappedConditions[cond] = true;
            });
          } else if (dbProfile.healthConditions) {
             mappedConditions = { ...mappedConditions, ...dbProfile.healthConditions };
          }

          // Merge everything securely
          const mergedProfile = {
            ...DEFAULT_PROFILE,
            ...dbProfile,
            healthConditions: mappedConditions
          };

          // Update React state AND overwrite the local storage cache
          setUserProfile(mergedProfile);
          localStorage.setItem('userProfile', JSON.stringify(mergedProfile));
        }
      } catch (error) {
        console.error("Failed to fetch real profile from DB:", error);
      }
    };

    fetchRealProfile();
  }, []); // Empty array ensures this runs right when the app opens

  // 3. Save to local storage whenever profile state changes locally
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