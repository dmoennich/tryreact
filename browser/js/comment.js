/**
 * Created by daniel on 05.11.15.
 */
let React = require("react");
let marked = require("marked");


let comment = React.createClass({
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

module.exports = comment;
