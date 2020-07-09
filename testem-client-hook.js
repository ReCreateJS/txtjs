Testem.afterTests(function(config, data, callback) {
  console.log("sending coverage results from client...");
  var coverage = JSON.stringify(window.__coverage__);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback();
    }
  };
  xhr.open("POST", "/coverage", true);
  xhr.send(coverage);
});
