import { extensions } from '@wix/custom-extensions';
import { LAYOUT } from '@wix/react-component-schema';
import componentUrl from './context-counter-widget.tsx?url';

// `contextDependencies` must match the provider's `moduleSpecifier`: it keeps
// the import external and makes Thunderbolt wrap this component with the
// provider on live pages.
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
