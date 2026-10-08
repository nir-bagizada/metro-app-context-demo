import { extensions } from '@wix/custom-extensions/experimental';

// `type` must start with the codeIdentifier from wix.config.mjs; the release
// enrichment SPI rejects anything else. On live sites the provider runtime only
// loads behind the `specs.thunderbolt.contextProviders` experiment.
export default extensions.contextProvider({
  id: '0fb7a438-d06e-4760-8d23-fb57e0ce029d',
  name: 'counterContext',
  type: 'Guyo91Metropit0d6.EchoCounterContext',
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
      // Must equal the SDK subpath metro generates for this provider: viewer
      // consumers list it in `contextDependencies` so Thunderbolt's import map
      // resolves it to this bundle, while headless apps get it from npm.
      moduleSpecifier: '@wix/echo/context',
    },
  },
});
