/**
 * Created by daniel on 05.11.15.
 */
let React = require("react");
let Comment = require("./comment");

let CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map((comment, i) => (
            <Comment key={i} author={comment.author}>{comment.text}</Comment>
        ));
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});


module.exports = CommentList;
