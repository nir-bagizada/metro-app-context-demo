import type { FC, ReactNode } from 'react';
import { Component } from 'react';
// The hook + its type come from the provider's `contextSpecifier.moduleSpecifier`
// (`echo-counter-context`), NOT a relative import of the provider .tsx — a
// relative import would bundle a second React-context instance and never see the
// provider's value. `contextDependencies` (see the .extension.ts) makes @wix/astro
// treat this specifier as an external; Thunderbolt's import map resolves it to the
// provider's client bundle at runtime.
//
// `@ts-expect-error`: the module is generated at build/runtime, so it has no
// static types — a T21 authoring-experience finding (no manifest→d.ts codegen,
// wayfinder T20). We re-assert the shape via `CounterContextType` below.
// @ts-expect-error runtime-generated module, no static types
import { useCounterContext } from 'echo-counter-context';

type CounterContextType = {
  count: number;
  decrement: () => void;
  increment: () => void;
  setCount: (count: number) => void;
};

type ContextCounterWidgetProps = {
  id?: string;
  className?: string;
};

const shellStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  padding: 16,
  fontFamily: 'system-ui, sans-serif',
  border: '1px solid #ddd',
  borderRadius: 8,
} as const;

/**
 * Error boundary so a missing context provider NEVER crashes the host.
 *
 * `useCounterContext()` throws synchronously in render when no
 * <CounterContextProvider> is above it — which is the case off a live page, and
 * on live pages when the `specs.thunderbolt.contextProviders` experiment is
 * closed (wayfinder T20/T21). We catch it and render a neutral placeholder, the
 * same defence the ViewerService counter widget uses.
 */
class ContextBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Inner widget — consumes the EDITOR_CONTEXT_PROVIDER counter via its hook.
 *
 * `count` is a signal; reading `count.value` in render subscribes this component
 * so it re-renders on change. This is the context-provider twin of the
 * ViewerService counter widget, and proves the same counter behaviour through the
 * context-provider primitive.
 */
const ContextCounterInner: FC<ContextCounterWidgetProps> = ({
  id,
  className,
}) => {
  const { count, increment, decrement, setCount } =
    useCounterContext() as CounterContextType;

  return (
    <div
      id={id}
      className={['context-counter-widget', className]
        .filter(Boolean)
        .join(' ')}
      style={shellStyle}
    >
      <span>
        Context count:{' '}
        <strong data-hook="echo-context-counter-count">{count}</strong>
      </span>
      <button type="button" onClick={increment}>
        Increment
      </button>
      <button type="button" onClick={decrement}>
        Decrement
      </button>
      <button type="button" onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
};

/**
 * Harness widget for the echo counter CONTEXT PROVIDER.
 *
 * Declaring `echo-counter-context` in the extension's `contextDependencies` is
 * what makes Thunderbolt wrap this component's subtree with the provider on a
 * live page (gated by `specs.thunderbolt.contextProviders`). Where the provider
 * is absent, the boundary shows a placeholder so the host still loads.
 *
 * React 17-compatible APIs only (site components don't support React 18 features).
 */
const ContextCounterWidget: FC<ContextCounterWidgetProps> = ({
  id,
  className,
}) => (
  <ContextBoundary
    fallback={
      <div
        id={id}
        className={['context-counter-widget', className]
          .filter(Boolean)
          .join(' ')}
        style={shellStyle}
      >
        <span>Echo context counter (loads on the published site)</span>
      </div>
    }
  >
    <ContextCounterInner id={id} className={className} />
  </ContextBoundary>
);

export default ContextCounterWidget;
