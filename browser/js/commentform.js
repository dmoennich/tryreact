/**
 * Created by daniel on 05.11.15.
 */
let React = require("react");


let CommentForm = React.createClass({
    handleSubmit: function (event) {
        event.preventDefault();
        let author = this.refs.author.value.trim();
        let text = this.refs.text.value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author, text});
        this.refs.author.value = "";
        this.refs.text.value = "";
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="your name" ref="author" />
                <input type="text" placeholder="say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});


module.exports = CommentForm;

