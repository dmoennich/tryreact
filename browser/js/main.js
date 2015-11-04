/**
 * Created by daniel on 04.11.15.
 */
let React = require("react");
let ReactDOM = require("react-dom");
let marked = require("marked");
let $ = require("jquery");



//let data = [
//    {author: "Daniel", text: "A nice comment!"},
//    {author: "some dude", text: "Another nice *comment*!"}
//];


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
    render: function () {
        return (
            <div className="commentForm">The form</div>
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
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
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
                <CommentForm />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);
