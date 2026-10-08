import { extensions } from '@wix/custom-extensions/experimental';

// Metro needs these fields to generate the export, but `sdkExports` does not
// accept them yet. Spreading bypasses the excess-property check, and the
// integration copies every option into `compData.sdkExports`.
const metroExportFields = {
  exportMetadata: {
    exportedName: 'CounterContextProvider',
    relativeSpecifier: 'context',
  },
  exposureAndMaturity: {
    exposure: 'PUBLIC',
    maturity: 'BETA',
  },
  peerDependencies: {
    react: '^16.14.0 || 17.x || 18.x || 19.x',
  },
};

// `id` reuses the compId of the former `useCounterContext` npm re-export so the
// release replaces that component in place.
export default extensions.sdkExports({
  ...metroExportFields,
  id: '733211f2-9403-4fad-a3b7-6668363ba546',
  name: 'Counter context',
  contextExports: {
    componentId: '0d656462-e848-4081-a0c3-ce93e8a54fef',
  },
});
