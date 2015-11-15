import jQuery = require('jquery');
import React = require('react');
import ReactDOM = require('react-dom');

window['jQuery'] = jQuery;

var semantic = require('../node_modules/semantic-ui/dist/semantic.js');

require("../node_modules/semantic-ui/dist/semantic.css")

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});

var content = document.createElement("div");
document.body.appendChild(content);

ReactDOM.render(
  <CommentBox />,
  content
);
