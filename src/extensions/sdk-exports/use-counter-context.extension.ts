import { extensions } from '@wix/astro/builders/trusted';

/**
 * SDK_EXPORTS component for the context-provider hook (wayfinder T22/T23):
 * makes metro's generated `@wix/echo` re-export `useCounterContext` at its
 * root, importing it from the typed shim `@wix/echo-counter/context`
 * (`importMetadata.specifier` = source subpath; no
 * `exportMetadata.relativeSpecifier` → lands in the `@wix/echo` root index).
 *
 * Authored MANIFEST-FIRST via the `genericExtension` escape hatch — there is
 * no first-class SDK builder (T13). This deliberately doubles as a live probe
 * of whether app-release ingestion accepts SDK component types (T19 §1);
 * fallback on rejection is the Dev Center dashboard (phase-1 precedent).
 *
 * `compId` is a fresh, immutable Dev Center component UUID, pinned so every
 * future release UPSERTS this same component instead of minting duplicates
 * (T14/T18). Never change or reuse it. The phase-1 `useCounter` SDK_EXPORTS
 * and the SDK_DEFINITION were dashboard-created and are intentionally NOT
 * declared here — additive release leaves them untouched.
 *
 * `exposure: PUBLIC` + `maturity: BETA` is required for metro's generator to
 * pick the export up at all (it queries PUBLIC + GA/BETA only, T3); docs stay
 * unpublished per T8 discipline. `peerDependencies` are merged verbatim into
 * `@wix/echo`'s package.json — mirror the impl package's react peer range.
 */
export default extensions.genericExtension({
  compId: '733211f2-9403-4fad-a3b7-6668363ba546',
  compType: 'SDK_EXPORTS',
  compData: {
    sdkExports: {
      importMetadata: {
        packageName: '@wix/echo-counter',
        packageVersion: '^1.0.3',
        specifier: 'context',
        importedName: 'useCounterContext',
      },
      exportMetadata: {
        exportedName: 'useCounterContext',
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
      componentName: 'useCounterContext',
    },
  },
});
