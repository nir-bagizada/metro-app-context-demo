import React, { createContext, useCallback, useContext, useState } from 'react';

/**
 * EDITOR_CONTEXT_PROVIDER counter — the context-provider twin of the
 * ViewerService counter (../../viewer-service). Authored by hand from the CLI
 * scaffold at `@wix/cli/templates/astro/context-provider` because `wix generate`
 * has NO CONTEXT_PROVIDER type (wayfinder T21) — the template must be copied in.
 *
 * State is plain React `useState`, NOT the `@preact/signals-react` signal the CLI
 * scaffold template ships (wayfinder T21 finding #8). The provider and its
 * consumer widget are SEPARATELY bundled extensions, so each would carry its own
 * `signals-core` instance; a signal created here can't drive a re-render in the
 * consumer's bundle — the value reads correctly but mutations never notify it, so
 * the counter renders yet its buttons look dead. React Context propagation works
 * across bundles because React itself is a shared external: when `count` changes,
 * the context value changes identity and every consumer re-renders. This also
 * matches the manifest, which declares `count` as `dataType: 'number'`.
 *
 * The hook name below (`useCounterContext`) must match the extension's
 * `resources.contextSpecifier.hook` — that is the export Thunderbolt re-exports
 * from the provider's runtime module for consumers.
 */
export interface CounterContextType {
  count: number;
  decrement: () => void;
  increment: () => void;
  setCount: (count: number) => void;
}

export interface CounterProviderProps {
  children?: React.ReactNode;
  initialCount: number;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);
CounterContext.displayName = 'CounterContext';

export function useCounterContext(): CounterContextType {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error(
      'useCounterContext must be used within a CounterContextProvider',
    );
  }

  return context;
}

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
