/// /////////////////////////////////////////////////////////////
// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide
//
// For more information on working with page objects see:
//   https://nightwatchjs.org/guide/working-with-page-objects/
/// /////////////////////////////////////////////////////////////

module.exports = {
  beforeEach: (browser) => browser.init(),

  'e2e tests using page objects': (browser) => {
    const homepage = browser.page.homepage()
    homepage.waitForElementVisible('@appContainer')

    const app = homepage.section.app
    app.assert.elementCount('@pageWrapper', 1)
    app.expect.section('@content').to.be.visible
    app.expect.section('@logo').text.to.match(/^Dealership$/)

    browser.end()
  },

  'verify if the page have a button': (browser) => {
    const homepage = browser.page.homepage()
    const contentSection = homepage.section.app.section.content

    contentSection.expect.element('@button').text.to.contain('Button')
  }
}
