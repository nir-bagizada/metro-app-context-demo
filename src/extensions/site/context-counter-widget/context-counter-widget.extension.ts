import { extensions } from '@wix/astro/builders';
import { LAYOUT } from '@wix/react-component-schema';
import componentUrl from './context-counter-widget.tsx?url';

/**
 * Harness site component that consumes the echo counter CONTEXT PROVIDER
 * (wayfinder T21) — the context-provider twin of ../counter-widget (which
 * consumes the ViewerService leg). Both ship at once; the ViewerService leg is
 * retired in T24.
 *
 * `id` is an immutable Dev Center component UUID — never change/reuse it.
 *
 * `resources.client.dependencies.contextDependencies: ['echo-counter-context']`
 * is the critical line: it must match the provider's
 * `contextSpecifier.moduleSpecifier`. That declaration (a) externalises the
 * specifier so the `import { useCounterContext } from 'echo-counter-context'` in
 * the .tsx stays a runtime import, and (b) tells Thunderbolt to wrap this
 * component's subtree with the counter provider on a live page. Editor preview
 * loads ungated — never verify there (wayfinder T11/T20).
 *
 * editorReactComponent widgets are Wix HARMONY-only and only become addable after
 * `wix build && wix release` registers them in a released app version.
 */
export default extensions.editorReactComponent({
  id: '5c3953d4-597b-42af-9772-7ce68f3a7ed1',
  type: 'Guyo91Metropit0d6.ContextCounterWidget',
  displayName: 'Echo Context Counter Widget',
  description: 'Echo counter context-provider demo widget.',
  editorElement: {
    selector: '.context-counter-widget',
    displayName: 'Echo Context Counter Widget',
    layout: {
      resizeDirection: LAYOUT.RESIZE_DIRECTION.horizontalAndVertical,
      contentResizeDirection: LAYOUT.CONTENT_RESIZE_DIRECTION.vertical,
    },
  },
  installation: {
    initialSize: {
      width: {
        sizingType: LAYOUT.SIZING_TYPE.pixels,
        pixels: 320,
      },
      height: {
        sizingType: LAYOUT.SIZING_TYPE.content,
      },
    },
    // Auto-installs on the Harmony editor homepage, next to the ViewerService
    // counter widget, so both legs are placed for the live comparison.
    staticContainer: 'HOMEPAGE',
  },
  resources: {
    client: {
      componentUrl,
      dependencies: {
        contextDependencies: ['echo-counter-context'],
      },
    },
  },
});
