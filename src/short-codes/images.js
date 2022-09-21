const Image = require("@11ty/eleventy-img")

async function generateImages({
  src,
  alt,
  myClass,
  variant
}) {

  if (alt === undefined) {
    console.error(`Missing \`alt\` on image from: ${src}`);
    alt = "image"
  }

  const _src = "./src" + src
  const filename = _src.match(/([^\/]+)\.(\w+)$/)[1]

  const metadata = await Image(_src, {
    widths: [230, 300, 350, 480, 768, 1024, 2048],
    formats: ['jpeg'],
    urlPath: "/assets/images/",
    outputDir: "./dist/assets/images",
    filenameFormat: (id, _src, width, format, options) => `${filename}-${width}-${id}.${format}`
  });
  
  const srcsetJpeg = metadata.jpeg.filter(i => i).map(i => `${i.url} ${i.width}w`).join(', ')
  // const srcsetWebp = metadata.webp.filter(i => i).map(i => `${i.url} ${i.width}w`).join(', ')
  const srcLowResJpeg = metadata.jpeg.filter(i => i && i.width === 230).map(i => `${i.url}`)[0]
  // const srcLowResWebp = metadata.jpeg.filter(i => i && i.width === 230).map(i => `${i.url}`)[0]
  const minHeight = Math.ceil(metadata.jpeg[0].height / metadata.jpeg[0].width * 100)
  const heightLowRes = metadata.jpeg[0].height
  const widthLowRes = metadata.jpeg[0].width
  console.log(`Writing ${src}`)

  const style = variant === 'hero'
    ? `display:block; width:100%; background-color:#FBFBFB; min-height:${minHeight}vh; height: ${heightLowRes}; width: ${widthLowRes};`
    : `display:block; background-color:#FBFBFB; height: ${heightLowRes}; width: ${widthLowRes};`
  // style="display:block is important for lazyload to calculate correctly

  return `<img alt="${alt}" 
            data-sizes="auto"
            data-srcset="${srcsetJpeg}"
            src="${srcLowResJpeg}"
            class="lazyload ${myClass}"
            style="${style}"
          >`;
  // return `
  //   <picture>
  //     <source type="image/webp" 
  //       data-sizes="auto" data-srcset="${srcsetWebp}">
  //     <source type="image/jpeg" 
  //       data-sizes="auto" data-srcset="${srcsetJpeg}">
  //     <img alt="${alt}" src="${srcLowResJpeg}"
  //       class="lazyload ${myClass}" style="${style}">
  //   </picture>
  // `
}

module.exports = generateImages
