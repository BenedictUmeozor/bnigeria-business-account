import { createContext, useContext } from 'react';

export const OnboardingContext = createContext<HM.OnboardingContextType>({
  current: -1,
  setCurrent: () => {},
  shareholders: [],
  setShareholders: () => {},
  stakePercentage: undefined,
  setStakePercentage: () => {},
});

export const useSoleTraderOnboardingContext = () => {
  return useContext(OnboardingContext);
};
