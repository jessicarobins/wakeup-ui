import { WakeupUiPage } from './app.po';

describe('wakeup-ui App', () => {
  let page: WakeupUiPage;

  beforeEach(() => {
    page = new WakeupUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
