import { NgCounterPage } from './app.po';

describe('ng-counter App', () => {
  let page: NgCounterPage;

  beforeEach(() => {
    page = new NgCounterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
