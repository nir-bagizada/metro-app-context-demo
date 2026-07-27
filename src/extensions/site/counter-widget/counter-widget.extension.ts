import { extensions } from '@wix/astro/builders';
import { LAYOUT } from '@wix/react-component-schema';
// `?url` import → @wix/astro resolves this to a src-relative path, builds the
// component, and rewrites resources.client.componentUrl to the built dist URL in
// the generated app manifest.
import componentUrl from './counter-widget.tsx?url';

/**
 * Harness site component that consumes the echo counter ViewerService.
 *
 * `id` is an immutable Dev Center component UUID — never change/reuse it.
 *
 * IMPORTANT: editorReactComponent widgets are Wix HARMONY-only. They do NOT
 * appear in Classic Wix Editor or Wix Studio (Wix docs are explicit about this).
 * The widget also only becomes addable after `wix build && wix release`
 * registers this extension in a released app version — `wix build`/`wix preview`
 * alone won't expose it.
 *
 * RETIRED the ViewerService leg (wayfinder T24): `serviceDependencies:
 * ['@wix/echo-counter']` is gone along with the ViewerService extension it
 * gated, and `contextDependencies` — previously carried only to satisfy
 * @wix/echo's root-level context re-export (T23 finding #3) — is now what this
 * widget actually needs, since its .tsx consumes the context hook.
 */
export default extensions.editorReactComponent({
  id: '4bea6986-63b0-4bc1-b872-4b3d838fe3a1',
  // Format: `<app code identifier>.<ComponentName>` (from wix.config.json
  // codeIdentifier). The release enrichment SPI rejects a bare type with
  // "Component type does not begin with code identifier".
  type: 'Guyo91Metropit0d6.CounterWidget',
  displayName: 'Echo Counter Widget',
  description: 'Echo counter viewer-context demo widget.',
  editorElement: {
    selector: '.counter-widget',
    displayName: 'Echo Counter Widget',
    layout: {
      resizeDirection: LAYOUT.RESIZE_DIRECTION.horizontalAndVertical,
      contentResizeDirection: LAYOUT.CONTENT_RESIZE_DIRECTION.vertical,
    },
  },
  // REQUIRED for the widget to be addable/placeable in the editor.
  installation: {
    initialSize: {
      width: {
        sizingType: LAYOUT.SIZING_TYPE.pixels,
        pixels: 260,
      },
      height: {
        sizingType: LAYOUT.SIZING_TYPE.content,
      },
    },
    // Auto-installs on the Harmony editor homepage.
    staticContainer: 'HOMEPAGE',
  },
  resources: {
    client: {
      componentUrl,
      dependencies: {
        // Must match the provider's `contextSpecifier.moduleSpecifier`: it keeps
        // the specifier external so the hook stays a runtime import, and tells
        // Thunderbolt to wrap this component's subtree with the counter provider.
        contextDependencies: ['echo-counter-context'],
      },
    },
  },
});
