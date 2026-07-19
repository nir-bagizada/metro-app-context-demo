/**
 * Local ViewerService bundle entry for the echo counter.
 *
 * `@wix/astro` re-exports ONLY this module's `default` to Thunderbolt's
 * external-services loader (astro's virtual module does
 * `export { default } from '<this file>'`). The loader picks the implementation
 * with `impl ?? implementation ?? default` and CALLS it as a service factory,
 * keying the registration on the manifest `packageName` (`@wix/echo-counter`).
 *
 * Therefore the default export MUST be the factory function itself. `impl`
 * (from the package) is exactly that — `implementService` returns its factory
 * arg. Exporting a `{ definition, impl }` object instead makes the loader call
 * an object as a factory → "TypeError: … is not a function", which blanks the
 * page/editor. The service's definition id equals the packageName so consumers
 * (`useService(CounterServiceDefinition)`) resolve what the loader registered.
 */
export { impl as default } from '@wix/echo-counter/viewer';
