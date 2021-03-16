/**
 * A Nightwatch page object. The page object name is the filename.
 *
 * Example usage:
 *   browser.page.homepage.navigate()
 *
 * For more information on working with page objects see:
 *   https://nightwatchjs.org/guide/working-with-page-objects/
 *
 */

module.exports = {
  url: '/',
  commands: [],

  // A page object can have elements
  elements: {
    appContainer: '#app'
  },

  // Or a page objects can also have sections
  sections: {
    app: {
      selector: '#app',

      elements: {
        pageWrapper: 'div.layout-wrapper'
      },

      // - a page object section can also have sub-sections
      // - elements or sub-sections located here are retrieved using the "app" section as the base
      sections: {
        logo: {
          selector: 'a.navbar-brand'
        },

        content: {
          // the equivalent css selector for the "layout-content" sub-section would be:
          //  '#app div.layout-content'
          selector: 'div.layout-content',

          elements: {
            button: {
              selector: 'button.btn'
            }
          }
        }
      }
    }
  }
}
