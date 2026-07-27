import { app } from '@wix/astro/builders';
import myPage from './extensions/dashboard/pages/my-page/my-page.extension.ts';
import counterWidget from './extensions/site/counter-widget/counter-widget.extension.ts';
import counterContextProvider from './extensions/context-provider/counter/counter.extension.ts';
import counterContextInstall from './extensions/context-provider/counter/counter.install.extension.ts';
import contextCounterWidget from './extensions/site/context-counter-widget/context-counter-widget.extension.ts';
import useCounterContextExport from './extensions/sdk-exports/use-counter-context.extension.ts';
import counterContextTypeExport from './extensions/sdk-exports/counter-context-type.extension.ts';

export default app()
  .use(myPage)
  .use(counterWidget)
  .use(counterContextProvider)
  .use(counterContextInstall)
  .use(contextCounterWidget)
  .use(useCounterContextExport)
  .use(counterContextTypeExport);
