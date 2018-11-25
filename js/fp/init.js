fp.init = async function() {
  await fp.loadKeys();
  await fp.language.global.renderTitle();
  // fp.scripture.renderScripture('acts-1-1-2-47');
  fp.showContent('dashboard');
};

fp.init();