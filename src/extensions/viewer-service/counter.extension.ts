import { extensions } from '@wix/astro/builders';

/**
 * ViewerService extension exposing the echo counter as a services-manager
 * service on live Wix sites.
 *
 * `id` is an immutable Dev Center component UUID — never change or reuse it, or
 * the registration is orphaned (wayfinder T6). `viewer.bundle` points at the
 * local bundle entry, which re-exports `{ definition, impl }` from
 * `@wix/echo-counter/viewer`.
 *
 * NOTE: a ViewerService only loads on a live page when an on-page component
 * declares it via `serviceDependencies` — that is the job of the companion
 * counter widget (see ../site/counter-widget).
 */
export default extensions.viewerService({
  id: '61d3b133-8a0e-4003-b7de-74f1f8eae162',
  packageName: '@wix/echo-counter',
  description: 'Echo counter viewer context (demo)',
  viewer: {
    bundle: './extensions/viewer-service/counter.viewer.ts',
    dependencies: [],
  },
});
