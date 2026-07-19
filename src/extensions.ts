import { app } from '@wix/astro/builders';
import myPage from './extensions/dashboard/pages/my-page/my-page.extension.ts';
import counterViewerService from './extensions/viewer-service/counter.extension.ts';
import counterWidget from './extensions/site/counter-widget/counter-widget.extension.ts';

export default app()
  .use(myPage)
  .use(counterViewerService)
  .use(counterWidget);
