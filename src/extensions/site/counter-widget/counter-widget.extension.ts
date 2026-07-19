import { extensions } from '@wix/astro/builders';
// `?url` import → @wix/astro resolves this to a src-relative path, builds the
// component, and rewrites resources.client.componentUrl to the built dist URL in
// the generated app manifest.
import componentUrl from './counter-widget.tsx?url';

/**
 * Harness site component that consumes the echo counter ViewerService.
 *
 * `id` is an immutable Dev Center component UUID — never change/reuse it.
 *
 * `resources.client.dependencies.serviceDependencies: ['@wix/echo-counter']` is
 * the critical line: on a live published site Thunderbolt only loads a
 * ViewerService when an on-page component declares it here. Without it the
 * counter service never loads and `useService` inside the widget would throw
 * (editor preview loads services ungated — never verify there; wayfinder T11).
 */
export default extensions.editorReactComponent({
  id: '4bea6986-63b0-4bc1-b872-4b3d838fe3a1',
  type: 'CounterWidget',
  name: 'Echo Counter Widget',
  editorElement: {
    selector: '.counter-widget',
    displayName: 'Echo Counter Widget',
  },
  resources: {
    client: {
      componentUrl,
      dependencies: {
        serviceDependencies: ['@wix/echo-counter'],
      },
    },
  },
});
