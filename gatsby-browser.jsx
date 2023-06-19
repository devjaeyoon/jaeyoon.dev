const React = require('react');

const Root = require('./src/Root').default;

exports.wrapPageElement = ({ element }) => <Root>{element}</Root>;
