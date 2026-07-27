import type { FC, ReactNode } from 'react';
import { Component } from 'react';
// MIGRATED off the ViewerService leg (wayfinder T24). This widget used to read
// the counter through `useCounter()` + `useService(CounterServiceDefinition)`,
// both backed by the `@wix/echo-counter` ViewerService extension. That extension
// is gone, so the only live counter path is the EDITOR_CONTEXT_PROVIDER one, and
// this widget now consumes it exactly like ../context-counter-widget does.
//
// `CounterContextType` must stay a type-only import: the generated SDK ships it
// as a broken runtime binding (tsup emits type re-exports as value re-exports —
// wayfinder T23 finding #2), so only elided type imports are safe.
import { useCounterContext } from '@wix/echo';
import type { CounterContextType } from '@wix/echo';

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
 * Error boundary so a missing context provider NEVER crashes the host.
 *
 * `useCounterContext()` throws synchronously in render when no provider is above
 * it. Off a live page that is always the case; on a live page it also happens
 * when this widget sits OUTSIDE the container the counter context is attached to
 * (attachment is a per-container document-model edit, not an app-wide switch —
 * wayfinder T21 step 3 / T27). The sibling ../context-counter-widget is the
 * known-good control: if that one renders and this one shows the placeholder,
 * the attach scope doesn't cover this widget's container.
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

const CounterInner: FC<CounterWidgetProps> = ({ id, className }) => {
  const { count, increment, setCount } =
    useCounterContext() as CounterContextType;

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
      <button type="button" onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
};

/**
 * Harness widget for the echo counter, now on the context-provider path.
 *
 * Kept declared (same immutable compId) rather than deleted so the already-placed
 * instance on the live harness page keeps resolving to a real component — this is
 * the migration shape a team with a released ViewerService would follow: repoint
 * the consumer, drop the service, keep the component identity.
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
