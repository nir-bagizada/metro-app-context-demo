import { extensions } from '@wix/astro/builders/experimental';
// `?url` import → @wix/astro runs the context-provider client bundler over this
// source and rewrites resources.client.url to the built runtime module URL in the
// generated manifest (same pattern as the editorReactComponent's componentUrl).
import providerUrl from './counter.provider.tsx?url';

/**
 * EDITOR_CONTEXT_PROVIDER counter extension (wayfinder T21).
 *
 * This is the context-provider twin of the ViewerService counter. Both ship in
 * the demo app at once — nothing is thrown away until the ViewerService leg is
 * retired in T24. The two use fresh, independent Dev Center component ids.
 *
 * `id` is an immutable Dev Center component UUID — never change or reuse it, or
 * the registration is orphaned (wayfinder T6/T18).
 *
 * `type` must be `<codeIdentifier>.<ComponentName>` (codeIdentifier from
 * wix.config.json). The release enrichment SPI rejects a bare type with
 * "Component type does not begin with code identifier" — same rule the counter
 * widget hit.
 *
 * `context.items` is the DECLARATIVE api surface (a number + three functions,
 * one parameterised). It feeds the editor (binding panels) and validation; it is
 * NOT the source of consumer typings — those are hand-written in the provider
 * (CounterContextType). This gap is a T21 authoring-experience finding: the
 * "manifest → d.ts" codegen the parent effort wants does not exist for context
 * providers (wayfinder T20).
 *
 * `resources.contextSpecifier.hook` names the consumer hook Thunderbolt
 * re-exports from the provider runtime module; it MUST match the provider's
 * exported `useCounterContext`.
 *
 * LIVE-SITE GATE: on live viewer sites the context-provider runtime only loads
 * behind the experiment `specs.thunderbolt.contextProviders` (wayfinder T20 §3b).
 * The harness site needs that spec opened before the counter will load — see the
 * T21 HITL checklist.
 */
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
      url: providerUrl,
    },
    contextSpecifier: {
      hook: 'useCounterContext',
      // The module id consumers import the hook from AND list in their
      // `contextDependencies` (proven against wix-private/lite-events'
      // events-contexts-poc). It need NOT be a real npm package — Thunderbolt's
      // import map maps it to this provider's client bundle at runtime. A bare id
      // (not `@wix/echo/*` — that surface is T22's decision) keeps the demo leg
      // self-contained; because it resolves only at runtime, consumers import it
      // with `@ts-expect-error` (a T21 finding: no build-time consumer typings).
      moduleSpecifier: 'echo-counter-context',
    },
  },
});
