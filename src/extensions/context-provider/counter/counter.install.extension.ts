import { editorInstallation } from '@wix/app-extensions/trusted';

// `contextProvider` only registers the provider; this install record is what
// makes it available on sites. `@wix/custom-extensions` does not re-export the
// internal `editorInstallation` builder.
export default editorInstallation({
  id: '76ca1d9d-a966-4b1b-b211-5c3a42d53120',
  name: 'Echo counter context install',
  data: {
    targetEditors: ['HARMONY_EDITOR_TYPE'],
    contextProviders: [
      { component: { componentId: '0fb7a438-d06e-4760-8d23-fb57e0ce029d' } },
    ],
  },
});
