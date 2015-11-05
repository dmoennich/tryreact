/**
 * Created by daniel on 05.11.15.
 */
let React = require("react");
let $ = require("jquery");
let CommentList = require("./commentlist");
let CommentForm = require("./commentform");
let comEvents = require("./commentevents");
let comCom = require("./commentcom");

let CommentBox = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    handleXhr: function (response) {
        response.then(data => this.setState({data}))
            .then(null, (xhr, status, err) => console.error(status, err.toString()));
    },
    handleCommentSubmit: function (comment) {
        this.handleXhr(comCom.newComment(comment));
    },
    loadCommentsFromServer: function () {
        this.handleXhr(comCom.getAll());
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
        comEvents.register((eventType, comment) => {
            if (eventType === "delete") {
                this.handleXhr(comCom.delComment(comment));
            }
        });
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


module.exports = CommentBox;