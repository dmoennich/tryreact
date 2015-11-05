/**
 * Created by daniel on 05.11.15.
 */
let React = require("react");
let marked = require("marked");
let comEvents = require("./commentevents");


let Comment = React.createClass({
    handleDelete: function () {
        comEvents.notify("delete", {
            "author": this.props.author,
            "text": this.props.children.toString()});
    },
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
                <button onClick={this.handleDelete}>delete</button>
            </div>
        );
    }
});

module.exports = Comment;
