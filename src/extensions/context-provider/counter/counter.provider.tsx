import React, { createContext, useCallback, useContext, useState } from 'react';

// State is React `useState`, not a signal: the provider and its consumers are
// separately bundled, and only React (a shared external) propagates updates
// across bundles.

/** Counter state and actions exposed by the echo counter context. */
export interface CounterContextType {
  /** Current counter value. */
  count: number;
  /** Decrements the counter by 1. */
  decrement: () => void;
  /** Increments the counter by 1. */
  increment: () => void;
  /**
   * Sets the counter to a specific value.
   * @param count - The new counter value.
   */
  setCount: (count: number) => void;
}

/** Props of {@link CounterContextProvider}. */
export interface CounterProviderProps {
  children?: React.ReactNode;
  /** Value the counter starts from. Defaults to `0`. */
  initialCount: number;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);
CounterContext.displayName = 'CounterContext';

/**
 * Returns the counter state and actions of the nearest counter provider.
 * @throws If called outside a `CounterContextProvider`.
 */
export function useCounterContext(): CounterContextType {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error(
      'useCounterContext must be used within a CounterContextProvider',
    );
  }

  return context;
}

/** Provides counter state to its subtree. */
function CounterContextProvider({
  children,
  initialCount,
}: CounterProviderProps): React.ReactNode {
  const [count, setCount] = useState(initialCount || 0);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);

  const api: CounterContextType = {
    count,
    decrement,
    increment,
    setCount,
  };

  return (
    <CounterContext.Provider value={api}>{children}</CounterContext.Provider>
  );
}

CounterContextProvider.displayName = 'CounterContextProvider';

export default CounterContextProvider;
