import { BantumiPage } from './app.po';

describe('bantumi App', () => {
  let page: BantumiPage;

  beforeEach(() => {
    page = new BantumiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
