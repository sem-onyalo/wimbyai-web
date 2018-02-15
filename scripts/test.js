require('babel-register')();

var jsdom = require('jsdom');
var enzyme = require('enzyme');
var EnzymeAdapter = require('enzyme-adapter-react-16');

var exposedProperties = ['window', 'navigator', 'document'];

const {
  JSDOM
} = jsdom;
const {
  document
} = (new JSDOM('')).window;

enzyme.configure({
  adapter: new EnzymeAdapter()
});

global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;