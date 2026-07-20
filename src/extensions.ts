import { app } from '@wix/astro/builders';
import myPage from './extensions/dashboard/pages/my-page/my-page.extension.ts';
import counterViewerService from './extensions/viewer-service/counter.extension.ts';
import counterWidget from './extensions/site/counter-widget/counter-widget.extension.ts';
import counterContextProvider from './extensions/context-provider/counter/counter.extension.ts';
import contextCounterWidget from './extensions/site/context-counter-widget/context-counter-widget.extension.ts';

export default app()
  .use(myPage)
  .use(counterViewerService)
  .use(counterWidget)
  .use(counterContextProvider)
  .use(contextCounterWidget);
