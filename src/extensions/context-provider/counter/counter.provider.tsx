import { useSignal } from '@preact/signals-react';
import type { Signal } from '@preact/signals-react';
import React, { createContext, useContext } from 'react';

/**
 * EDITOR_CONTEXT_PROVIDER counter — the context-provider twin of the
 * ViewerService counter (../../viewer-service). Authored by hand from the CLI
 * scaffold at `@wix/cli/templates/astro/context-provider` because `wix generate`
 * has NO CONTEXT_PROVIDER type (wayfinder T21) — the template must be copied in.
 *
 * State (`count`) is a `@preact/signals-react` signal so consumers re-render on
 * change. `@preact/signals-react` is bundled INTO this provider (it is not in
 * @wix/astro's externals list — only react/react-dom/jsx + services-manager-react
 * are shared with the host); react is shared, so the signal's React binding works
 * against the host's React instance.
 *
 * The hook name below (`useCounterContext`) must match the extension's
 * `resources.contextSpecifier.hook` — that is the export Thunderbolt re-exports
 * from the provider's runtime module for consumers.
 */
export interface CounterContextType {
  count: Signal<number>;
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
  const count = useSignal(initialCount || 0);

  const increment = () => {
    count.value += 1;
  };

  const decrement = () => {
    count.value -= 1;
  };

  const setCount = (value: number) => {
    count.value = value;
  };

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
