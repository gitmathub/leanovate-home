// const generateImages = require('./src/short-codes/images')

module.exports = eleventyConfig => {

  eleventyConfig.addPassthroughCopy({
    'src/assets': 'assets/',
    'src/images': 'images/',
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
		files: './dist/css/**/*.css'
	})

  return {
    dir: {
      input: 'src',
      output: 'dist',
      layouts: 'templates',
      includes: 'macros',
      data: 'data',
    },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
