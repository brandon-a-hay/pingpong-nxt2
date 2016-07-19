describe('App', function () {
    beforeEach(function () {
        browser.get('/');
    });
    it('should have a title', function () {
        var subject = browser.getTitle();
        var result = 'Angular 2 MEAN Webpack Starter Kit by @datatype_void';
        expect(subject).toEqual(result);
    });
    it('should have <md-toolbar>', function () {
        var subject = element(by.css('app md-toolbar')).isPresent();
        var result = true;
        expect(subject).toEqual(result);
    });
    it('should have <md-content>', function () {
        var subject = element(by.css('app md-content')).isPresent();
        var result = true;
        expect(subject).toEqual(result);
    });
    it('should have text in footer', function () {
        var subject = element(by.css('app #footerText')).getText();
        var result = 'Angular 2 MEAN Webpack Starter by @datatype_void';
        expect(subject).toEqual(result);
    });
});
//# sourceMappingURL=app.component.e2e.js.map