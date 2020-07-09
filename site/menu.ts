(function() {
  const layout = document.getElementById("layout");
  const menu = document.getElementById("menu");
  const menuLink = document.getElementById("menuLink");

  function toggleClass(element, className) {
    const classes = element.className.split(/\s+/);
    const length = classes.length;
    let i = 0;

    for (; i < length; i++) {
      if (classes[i] === className) {
        classes.splice(i, 1);
        break;
      }
    }
    // The className is not found
    if (length === classes.length) {
      classes.push(className);
    }

    element.className = classes.join(" ");
  }

  menuLink.onclick = function(e) {
    const active = "active";

    e.preventDefault();
    toggleClass(layout, active);
    toggleClass(menu, active);
    toggleClass(menuLink, active);
  };
})();
