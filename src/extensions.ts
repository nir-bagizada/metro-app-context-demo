import { app } from '@wix/custom-extensions';
import counterContextProvider from './extensions/context-provider/counter/counter.extension.ts';
import counterContextInstall from './extensions/context-provider/counter/counter.install.extension.ts';
import contextCounterWidget from './extensions/site/context-counter-widget/context-counter-widget.extension.ts';
import counterContextExport from './extensions/sdk-exports/counter-context.extension.ts';

export default app()
  .use(counterContextProvider)
  .use(counterContextInstall)
  .use(contextCounterWidget)
  .use(counterContextExport);
