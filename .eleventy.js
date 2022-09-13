// const generateImages = require('./src/short-codes/images')
const htmlmin = require('html-minifier')

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

  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        // continueOnParseError: true,
        minifyJS: true
      })
    }
    return content
  })

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
      includes: 'utils',
      data: 'data',
    },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
