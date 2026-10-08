import type { FC, ReactNode } from 'react';
import { Component } from 'react';
// `contextDependencies` (see the .extension.ts) keeps `@wix/echo/context`
// external, so Thunderbolt's import map resolves it to the provider bundle it
// mounts instead of bundling a second copy of the context.
import { useCounterContext } from '@wix/echo/context';

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

// `useCounterContext()` throws when no provider is mounted (off live pages, or
// with the context-providers experiment closed); render a placeholder instead.
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

const ContextCounterInner: FC<ContextCounterWidgetProps> = ({
  id,
  className,
}) => {
  const { count, increment, decrement, setCount } = useCounterContext();

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
