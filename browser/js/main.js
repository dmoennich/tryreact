/**
 * Created by daniel on 04.11.15.
 */
let React = require("react");
let ReactDOM = require("react-dom");
let marked = require("marked");
let $ = require("jquery");


let Comment = React.createClass({
    rawMarkup: function () {
        let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return {__html: rawMarkup};
    },
    render: function () {
       return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
               <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});



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


let CommentBox = React.createClass({
    getInitialState: function () {
      return {data: []};
    },
    handleCommentSubmit: function (comment) {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: data => {
                this.setState({data: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    },
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: data => this.setState({data: data}),
            error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
        });
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);
