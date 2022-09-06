module.exports = function (eleventyConfig) {

  return {
    dir: {
      input: 'src',
      layouts: 'templates',
      includes: 'templates'
    },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
