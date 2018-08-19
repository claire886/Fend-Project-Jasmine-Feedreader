/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests.
 */

/* All of the tests are within the $() function,
 * since some of these tests may require DOM elements.
 * This will ensure they don't run until the DOM is ready.
 */
$(function() {
    /* First test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This test is to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        /* This test loops through each feed
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


    /* This test suite is about menu. It ensures the menu is hidden by 
     * default and can be toggled.
     */
    describe('The menu', function() {

        /* This test ensures that the menu element is
         * hidden by default.
         */
        const body = $('body');

        it('menu default hidden', function() {
            /* check if body element has class of 'munu-hidden',
             * if it does, menu element will be hidden.
             */
            expect(body.hasClass('menu-hidden')).toBe(true);
         });

         /* This test ensures that the menu changes visibility when the 
          * menu icon is clicked: the menu displayed when menu icon
          * clicked and hideen when menu icon clicked again.
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

    /* This test ensures when the loadFeed function is called and completes its work,
     * there is at least a single .entry element within the .feed container. */
    describe('Initial Entries', function() {

         /* The test uses beforeEach and done() to make sure loadFeed() is called
         * and completes its work before expecting .feed's entry.
         */
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
         });

         it('loadFeed() successful with initial entries', function(done) {
            const feedEntry = $('.feed .entry');
            
            // check if .feed has at least one entry by counting its elements.
            expect(feedEntry.length).not.toBeLessThan(0);
            done();
         });
    });
        
    /* This test suite ensures when a new feed is loaded by the loadFeed 
     * function, the content actually changes. */
    describe('New Feed Selection', function() {
        const feed = $('.feed');
        let oldContent = '';
        let newContent = '';

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
