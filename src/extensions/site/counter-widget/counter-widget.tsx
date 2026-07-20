import type { FC, ReactNode } from 'react';
import { Component, useEffect } from 'react';
import { useService } from '@wix/services-manager-react';
import { useCounter } from '@wix/echo';
import { CounterServiceDefinition } from '@wix/echo-counter';

type CounterWidgetProps = {
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
 * Error boundary so a missing ServicesManager context NEVER crashes the host.
 *
 * The counter ViewerService is provided by Thunderbolt on a LIVE page (gated by
 * this component's `serviceDependencies`). In environments where that provider
 * isn't set up — notably the Harmony editor canvas during bootstrap —
 * `useService` throws synchronously in render. Without this boundary that
 * exception propagates up and blanks the whole editor (the "site won't load"
 * symptom). Here we catch it and render a neutral placeholder instead.
 */
class CounterBoundary extends Component<
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
 * Inner widget — the part that actually consumes the counter viewer context.
 *
 * - `useCounter()` drives the reactive display (transform-independent).
 * - `useService(CounterServiceDefinition)` grabs the raw service instance and
 *   exposes it on `window.__echoCounter` — a manual-testing affordance for
 *   console pokes, NOT public API. It is the same instance the UI renders,
 *   which is what proves a single shared counter.
 *
 * Either hook throws if the ServicesManager provider is absent; that's expected
 * off a live page and is handled by <CounterBoundary> above.
 */
const CounterInner: FC<CounterWidgetProps> = ({ id, className }) => {
  const service = useService(CounterServiceDefinition);
  const { count, increment, reset } = useCounter();

  useEffect(() => {
    (window as unknown as { __echoCounter?: unknown }).__echoCounter = service;
  }, [service]);

  return (
    <div
      id={id}
      className={['counter-widget', className].filter(Boolean).join(' ')}
      style={shellStyle}
    >
      <span>
        Count: <strong data-hook="echo-counter-count">{count}</strong>
      </span>
      <button type="button" onClick={increment}>
        Increment
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

/**
 * Harness widget for the echo counter viewer context.
 *
 * On a live Wix page, declaring `@wix/echo-counter` in the extension's
 * `serviceDependencies` makes Thunderbolt load the ViewerService and mount the
 * ServicesManager context, so the inner hooks resolve and render the counter.
 * Anywhere the context is missing, the boundary shows a placeholder so the host
 * (e.g. the Harmony editor) still loads.
 *
 * React 17-compatible APIs only (site components don't support React 18 features).
 */
const CounterWidget: FC<CounterWidgetProps> = ({ id, className }) => (
  <CounterBoundary
    fallback={
      <div
        id={id}
        className={['counter-widget', className].filter(Boolean).join(' ')}
        style={shellStyle}
      >
        <span>Echo counter (loads on the published site)</span>
      </div>
    }
  >
    <CounterInner id={id} className={className} />
  </CounterBoundary>
);

export default CounterWidget;
