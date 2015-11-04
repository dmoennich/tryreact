/**
 * Created by daniel on 04.11.15.
 */
let React = require('react');
let ReactDOM = require('react-dom');


let Comment = React.createClass({
    render: function () {
       return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
});


let CommentForm = React.createClass({
    render: function () {
        return (
            <div className="commentForm">The form</div>
        );
    }
});

let CommentList = React.createClass({
    render: function () {
        return (
            <div className="commentList">
                <Comment author="Daniel">This is a comment!</Comment>
                <Comment author="some dude">This is *another* comment!</Comment>
            </div>
        );
    }
});

let CommentBox = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);
