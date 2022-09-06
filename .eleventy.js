module.exports = eleventyConfig => {

  eleventyConfig.addPassthroughCopy({
    'src/assets': '_assets/',
  })

  // override annoying md code formatting
  const markdownIt = require('markdown-it')({
    html: true
  })
    .disable('code')
  // .use(require('markdown-it-github-headings'))
  eleventyConfig.setLibrary('md', markdownIt)

  eleventyConfig.addFilter('json', (json, value = {}) => {
    return JSON.stringify(json || value)
  })

  eleventyConfig.setBrowserSyncConfig({
		files: './_site/css/**/*.css'
	})

  return {
    dir: {
      input: 'src',
      layouts: 'templates',
      includes: 'macros'
    },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
