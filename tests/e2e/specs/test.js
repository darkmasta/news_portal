// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'default e2e tests': browser => {
    browser
      .init()
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('h4')
      .assert.containsText('h4', 'Home')
      .assert.elementCount('button.btn', 1)
      .end()
  },

  'example e2e test using a custom command': browser => {
    browser
      .openHomepage()
      .assert.elementPresent('h4')
      .end()
  }
}
