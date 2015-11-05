/**
 * Created by daniel on 05.11.15.
 */
let $ = require("jquery");
//let Promise = require("bluebird");
let url = "/api/comments";

module.exports = {

    getAll: () => $.ajax({
        url: url,
        dataType: 'json',
        cache: false
    }),

    newComment: comment => $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        data: comment
    }),

    delComment: comment => $.ajax({
        url: url,
        dataType: 'json',
        type: 'DELETE',
        data: comment
    })

};



