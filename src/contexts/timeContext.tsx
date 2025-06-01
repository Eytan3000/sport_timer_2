import React, { createContext, useContext, useState } from 'react';

// 1. Define the context type (customize as needed)
interface MyContextType {
  initialRemainingTime: number;
  isPlaying: boolean;
  setInitialRemainingTime: React.Dispatch<React.SetStateAction<number>>;
  setisPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

// 2. Create the context
const MyContext = createContext<MyContextType | undefined>(undefined);

// 3. Provider component
export const TimeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [initialRemainingTime, setInitialRemainingTime] = useState(60);
  const [isPlaying, setisPlaying] = useState(false);
  const [seconds, setSeconds] = useState(60);

  return (
    <MyContext.Provider
      value={{
        initialRemainingTime,
        setInitialRemainingTime,
        isPlaying,
        setisPlaying,
        seconds,
        setSeconds,
      }}>
      {children}
    </MyContext.Provider>
  );
};

// 4. Custom hook for using the context
export function useTimeContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
}
