import { extensions } from '@wix/custom-extensions/trusted';

// Retired npm re-export of `CounterContextType`, which the context export now
// provides. Release never deletes components, so it stays declared with ALPHA
// maturity, which metro does not generate.
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
        maturity: 'ALPHA',
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
