const generateImages = require('./src/short-codes/images')
const htmlmin = require('html-minifier')
let collectionAll = null
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
        minifyJS: true,
        minifyCSS: true
      })
    }
    return content
  })

  eleventyConfig.addNunjucksAsyncShortcode('image', ({ src, alt, myClass }) => 
    generateImages({ src, alt, myClass }))

  
  eleventyConfig.addCollection('myCollectionName', function(collectionApi) {
    // get unsorted items
    collectionAll = collectionApi.getAll()
    return collectionApi.getAll();
    
  })

  eleventyConfig.addNunjucksShortcode('partial', function(partialName) {
    const path = this.page.filePathStem.substring(0, this.page.filePathStem.lastIndexOf("/"))
    const filePathStem = `${path}/${partialName}`
    const result = collectionAll.find(item => (item.filePathStem === filePathStem))
    return result?.templateContent || ''
  })

  eleventyConfig.addCollection("keyMustExistInData", function(collectionApi) {
    return collectionApi.getAll().filter(function(item) {
      // Side-step tags and do your own filtering
      return "myCustomDataKey" in item.data;
    });
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
      includes: 'utils', // rename utils to includes
      data: 'data',
    },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
