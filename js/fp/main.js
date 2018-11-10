const fp = {};

fp.showView = function(view) {
  return new Promise(function(resolve, reject) {
    if (! view) view = '/';
    const stateObj = {
      key: view
    };
    const pushState = history.pushState(stateObj);    
    console.log(pushState);
    resolve(pushState);
  });
};