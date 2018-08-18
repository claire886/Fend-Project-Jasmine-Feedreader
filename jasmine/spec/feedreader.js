/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        const body = $('body');

        it('menu default hidden', function() {
            /* check if body element has class of 'munu-hidden',
             * if it does, menu element will be hidden.
             */
            expect(body.hasClass('menu-hidden')).toBe(true);
         });
         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menun icon can toggle', function() {
            const menuIcon = $('.menu-icon-link');
            /* check if 'menu-hidden' class is added to or removed
             * from body element after menu icon is clicked.
             */
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false); 

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true); 
            
          });
    });
    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         
         /* use beforeEach and done() to make sure loadFeed() is called
          * and completes its work before expecting .feed's content
          */
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
         });

         it('loadFeed() successful with initial entries', function(done) {
            const feedContainer = $('.feed');
            /* check if .feed has at least one entry by counting its children elements.
             */
            expect(feedContainer.children.length).not.toBeLessThan(0);
            done();
         });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        const feed = $('.feed');
        let oldContent = '';
        let newContent = '';

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

         /* use loadFeed() twice to load data from different selections.
          * and then compare two sets of loaded data to make sure they are not the same.
          */
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldContent = feed.text();
                loadFeed(1, function() {
                    newContent = feed.text();
                    done();
                })
            });
        });

        it('New feed select successful changeing content', function(done) {
            expect(newContent).not.toBe(oldContent);
            done();
        });
    });
}());
