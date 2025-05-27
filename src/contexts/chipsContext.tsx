import React, { createContext, useContext, useState } from 'react';

// 1. Define the context type (customize as needed)
interface MyContextType {
  doneExercises: string[];
  setDoneExercises: React.Dispatch<React.SetStateAction<string[]>>;
}

// 2. Create the context
const MyContext = createContext<MyContextType | undefined>(undefined);

// 3. Provider component
export const ChipsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [doneExercises, setDoneExercises] = useState<string[]>([]);

  return (
    <MyContext.Provider value={{ doneExercises, setDoneExercises }}>
      {children}
    </MyContext.Provider>
  );
};

// 4. Custom hook for using the context
export function useChipsContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
}
