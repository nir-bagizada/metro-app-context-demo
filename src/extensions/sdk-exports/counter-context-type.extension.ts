import { extensions } from '@wix/astro/builders/trusted';

/**
 * SDK_EXPORTS component for the hook's TYPE (wayfinder T22/T23): re-exports
 * `CounterContextType` from `@wix/echo-counter/context` on `@wix/echo`'s
 * `./context` entry point, next to `useCounterContext` — the two must
 * share the same `exportMetadata.relativeSpecifier` or they land in different
 * generated files and different docs resources
 * (`sdk-exports-docs_echo_context`; one SDK_EXPORTS per symbol, T3).
 *
 * Note the two `specifier` fields below are different axes:
 * `importMetadata.specifier` is the SOURCE subpath inside the
 * `@wix/echo-counter` shim; `exportMetadata.relativeSpecifier` is the
 * DESTINATION entry point on the generated `@wix/echo` SDK. Both read
 * `context` here purely by COINCIDENCE — there is no linkage between them.
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
        packageVersion: '^1.0.5',
        specifier: 'context',
        importedName: 'CounterContextType',
      },
      exportMetadata: {
        exportedName: 'CounterContextType',
        relativeSpecifier: 'context',
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
