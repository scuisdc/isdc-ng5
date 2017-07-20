import { IsdcNgPage } from './app.po';

describe('isdc-ng App', () => {
  let page: IsdcNgPage;

  beforeEach(() => {
    page = new IsdcNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
