import { createContext, useState } from 'react';

type SharedContextType = {
  myName: string;
  updateName: (newValue: string) => void;
  id: string;
  updateId: (newValue: string) => void;
};

export const SharedContext = createContext<SharedContextType | undefined>(undefined);

export const SharedProvider = SharedContext.Provider
