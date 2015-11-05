/**
 * Created by daniel on 04.11.15.
 */
let React = require("react");
let ReactDOM = require("react-dom");
let CommentBox = require("./commentbox");

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);
