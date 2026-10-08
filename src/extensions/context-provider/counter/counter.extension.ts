import { extensions } from '@wix/custom-extensions/experimental';

// `type` must start with the codeIdentifier from wix.config.mjs; the release
// enrichment SPI rejects anything else. On live sites the provider runtime only
// loads behind the `specs.thunderbolt.contextProviders` experiment.
export default extensions.contextProvider({
  id: '0d656462-e848-4081-a0c3-ce93e8a54fef',
  name: 'counterContext',
  type: 'Guyo91Metropit0d6.CounterContext',
  description: 'Echo counter context provider (demo)',
  context: {
    items: {
      count: {
        dataType: 'number',
        displayName: 'Counter current value',
      },
      decrement: {
        dataType: 'function',
        displayName: 'Decrement counter value by 1',
        function: {},
      },
      increment: {
        dataType: 'function',
        displayName: 'Increment counter value by 1',
        function: {},
      },
      setCount: {
        dataType: 'function',
        displayName: 'Set counter value to a specific number',
        function: {
          parameters: [
            {
              dataType: 'number',
              displayName: 'New counter value',
            },
          ],
        },
      },
    },
  },
  data: {
    initialCount: {
      dataType: 'number',
      defaultValue: 0,
      deprecated: false,
      displayName: 'Initial Count',
    },
  },
  resources: {
    client: {
      url: './extensions/context-provider/counter/counter.provider.tsx',
    },
    contextSpecifier: {
      hook: 'useCounterContext',
      // Not an npm package: Thunderbolt's import map resolves it to this
      // provider's client bundle, and consumers list it in `contextDependencies`.
      moduleSpecifier: 'echo-counter-context',
    },
  },
});
