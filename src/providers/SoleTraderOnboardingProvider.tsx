import { OnboardingContext } from '@/contexts/sole-trader-onboarding-context';
import { ReactNode, useReducer, useMemo } from 'react';

interface OnboardingState {
  current: number;
  shareholders: HM.Shareholder[];
  stakePercentage: number | undefined;
}

type OnboardingAction =
  | { type: 'SET_CURRENT'; payload: number }
  | { type: 'SET_SHAREHOLDERS'; payload: HM.Shareholder[] }
  | { type: 'SET_STAKE_PERCENTAGE'; payload: number };

const initialState: OnboardingState = {
  current: -1,
  shareholders: [],
  stakePercentage: undefined,
};

function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction,
): OnboardingState {
  switch (action.type) {
    case 'SET_CURRENT':
      return { ...state, current: action.payload };
    case 'SET_SHAREHOLDERS':
      return { ...state, shareholders: action.payload };
    case 'SET_STAKE_PERCENTAGE':
      return { ...state, stakePercentage: action.payload };
    default:
      return state;
  }
}

const SoleOnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  const contextValue = useMemo(
    () => ({
      ...state,
      setCurrent: (value: number) =>
        dispatch({ type: 'SET_CURRENT', payload: value }),
      setShareholders: (value: HM.Shareholder[]) =>
        dispatch({ type: 'SET_SHAREHOLDERS', payload: value }),
      setStakePercentage: (value: number) =>
        dispatch({ type: 'SET_STAKE_PERCENTAGE', payload: value }),
    }),
    [state],
  );

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
};

export default SoleOnboardingProvider;
