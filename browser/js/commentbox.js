/**
 * Created by daniel on 05.11.15.
 */
let React = require("react");
let $ = require("jquery");
let CommentList = require("./commentlist");
let CommentForm = require("./commentform");
let comEvents = require("./commentevents");

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
        comEvents.register((eventType, comment) => {
            if (eventType === "delete") {
                $.ajax({
                    url: this.props.url,
                    dataType: 'json',
                    type: 'DELETE',
                    data: comment,
                    success: data => {
                        this.setState({data: data});
                    },
                    error: (xhr, status, err) => {
                        console.error(this.props.url, status, err.toString());
                    }
                });
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