import { definition, impl } from '@wix/echo-counter/viewer';

/**
 * Local ViewerService bundle entry for the echo counter.
 *
 * `@wix/astro` wraps this file and forwards its `default` export as the loaded
 * viewer-service bundle. Thunderbolt's external-services loader reads the
 * `{ definition, impl }` pair and registers the counter service into the page's
 * ServicesManager (see wayfinder T6). The service itself lives in the published
 * `@wix/echo-counter` package; this file only re-exports its viewer entry.
 */
export default { definition, impl };
