// Imported straight from `@wix/app-extensions/trusted` (both runtime + types) —
// `@wix/custom-extensions` does NOT re-export this `@internal` builder.
import { editorInstallation } from '@wix/app-extensions/trusted';

/**
 * EDITOR_INSTALLATION record — the missing piece that makes the counter CONTEXT
 * PROVIDER actually load on a site (wayfinder T21, finding #7).
 *
 * `extensions.contextProvider(...)` only REGISTERS the provider component; it
 * emits no install/placement declaration, so installing the app never puts the
 * provider anywhere and nothing wraps the consumer (live SSR throws
 * "useCounterContext must be used within a CounterContextProvider").
 *
 * `editorInstallation.contextProviders[]` is the site/CSM-level install record
 * that references the provider by `componentId` and — per the schema doc —
 * "Makes the context provider available in the site's CSM." It is an `@internal`
 * builder `@wix/custom-extensions` doesn't surface, so it's imported
 * straight from `@wix/app-extensions/trusted` and `.use()`d as a generic
 * extension (App.use normalizes any raw ExtensionData into a genericExtension).
 *
 * No page-level targeting field exists yet (EP-8232 roadmap) — this installs the
 * provider site-wide, which is exactly what the demo wants (wrap everything).
 *
 * `componentId` MUST equal the provider's immutable id in ./counter.extension.ts.
 */
export default editorInstallation({
  id: '76ca1d9d-a966-4b1b-b211-5c3a42d53120',
  name: 'Echo counter context install',
  data: {
    targetEditors: ['HARMONY_EDITOR_TYPE'],
    contextProviders: [
      { component: { componentId: '0d656462-e848-4081-a0c3-ce93e8a54fef' } },
    ],
  },
});
