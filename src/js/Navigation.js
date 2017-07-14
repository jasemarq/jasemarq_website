import navCss from '../scss/Navigation.scss';
let $ = require('jquery');

let navigation = {
  title: '',

  renderTitle() {

    $('body').append('<div id=\"nav\"><a href=\"#\"><h1 id=\"brand\">JASE MARQ</h1></a></div>');

  }
}


let Navigation = function Navigation() {
  return Object.assign(Object.create(navigation), {});
};

let NAVIGATION = Navigation();

module.exports = NAVIGATION;
