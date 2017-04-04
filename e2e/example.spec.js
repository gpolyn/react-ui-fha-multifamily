describe('home page', function() {

	it('should have something', function() {
		//browser.url('http://webdriver.io');
		browser.url('http://localhost:4567');
		var url = browser.getTitle();
		expect(url).toBe('FountainJS');
	});

});
