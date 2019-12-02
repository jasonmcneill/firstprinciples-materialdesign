module.exports = {
  "globDirectory": ".",
  "globPatterns": [
    "**/lang/*/global/content.xml",
    "**/*.{css,js,txt,woff,woff2,png,xml,html,json,pdf}"
  ],
  "globIgnores": ['**/icons/high-res.png', '**/lang/*', '**/splashscreens/*', '**/webfonts/*.eot', '**/webfonts/*.svg', '**/webfonts/*.ttf'],
  "swDest": "sw.js"
};
