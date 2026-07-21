import { extensions } from '@wix/astro/builders/trusted';

/**
 * SDK_EXPORTS component for the hook's TYPE (wayfinder T22/T23): re-exports
 * `CounterContextType` from `@wix/echo-counter/context` at the `@wix/echo`
 * root, next to `useCounterContext` (one SDK_EXPORTS per symbol, T3).
 *
 * `CounterContextType` is type-only — it has no runtime binding in the shim,
 * so the generated re-export must be elided from `@wix/echo`'s JS emit by its
 * TypeScript build. If generation instead emits a runtime `export { ... }`
 * that fails to link, that is a T23 "surprise" to record for the automation
 * spec (T25/T26), and this component's maturity can be dropped to pull it out
 * of generation.
 *
 * Same manifest-first / pinned-fresh-compId / PUBLIC+BETA rationale as
 * `use-counter-context.extension.ts` — see the comment there.
 */
export default extensions.genericExtension({
  compId: '14372f25-e253-47e1-8e9b-9a7eb3e5a7e5',
  compType: 'SDK_EXPORTS',
  compData: {
    sdkExports: {
      importMetadata: {
        packageName: '@wix/echo-counter',
        packageVersion: '^1.0.3',
        specifier: 'context',
        importedName: 'CounterContextType',
      },
      exportMetadata: {
        exportedName: 'CounterContextType',
      },
      exposureAndMaturity: {
        exposure: 'PUBLIC',
        maturity: 'BETA',
      },
      peerDependencies: {
        react: '^16.14.0 || 17.x || 18.x || 19.x',
      },
      devDependencies: {},
      optionalPeerDependencies: [],
      componentName: 'CounterContextType',
    },
  },
});
