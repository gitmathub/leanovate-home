(() => {

  switchLayoutToBrowserColorScheme()



  function switchLayoutToBrowserColorScheme() {
    const darkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;
    if (darkMode) {
      window.document.querySelector('html').setAttribute('theme', 'dark')
    } else {
      window.document.querySelector('html').setAttribute('theme', 'light')
    }
  }


})()