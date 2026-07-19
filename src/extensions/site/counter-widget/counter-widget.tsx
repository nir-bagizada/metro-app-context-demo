import type { FC } from 'react';
import { useEffect } from 'react';
import { useService } from '@wix/services-manager-react';
import { CounterServiceDefinition, useCounter } from '@wix/echo-counter';

type CounterWidgetProps = {
  id?: string;
  className?: string;
};

/**
 * Harness widget for the echo counter viewer context.
 *
 * On a live Wix page, declaring `@wix/echo-counter` in the extension's
 * `serviceDependencies` makes Thunderbolt load the ViewerService and mount the
 * ServicesManager context, so `useService` / `useCounter` resolve here.
 *
 * - `useCounter()` drives the reactive display (transform-independent).
 * - `useService(CounterServiceDefinition)` grabs the raw service instance and
 *   exposes it on `window.__echoCounter` — a manual-testing affordance for
 *   console pokes, NOT public API. It is the same instance the UI renders,
 *   which is what proves a single shared counter.
 *
 * React 17-compatible APIs only (site components don't support React 18 features).
 */
const CounterWidget: FC<CounterWidgetProps> = ({ id, className }) => {
  const service = useService(CounterServiceDefinition);
  const { count, increment, reset } = useCounter();

  useEffect(() => {
    (window as unknown as { __echoCounter?: unknown }).__echoCounter = service;
  }, [service]);

  return (
    <div
      id={id}
      className={['counter-widget', className].filter(Boolean).join(' ')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        fontFamily: 'system-ui, sans-serif',
        border: '1px solid #ddd',
        borderRadius: 8,
      }}
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

export default CounterWidget;
