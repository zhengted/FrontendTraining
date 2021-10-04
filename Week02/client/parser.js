const EOF = Symbol("EOF");

let currentToken = null;
function emit(token) {
    console.log(token);
}

function data(c) {
    if (c == "<") {
        return tagOpen;
    } else if (c == EOF) {
        emit({
            type: "EOF"
        })
        return ;
    } else {
        emit({
            type: "text",
            content: c
        })
        return data;
    }
}

function tagOpen(c) {
    if (c == "/") {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type : "startTag",
            tagName : ""
        }
        return tagName(c);
    } else {
        return ;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type : "endTag",
            tagName : ""
        }
        return tagName(c)
    } else if (c == ">") {
        // error
    } else if (c == EOF) {
        // error
    } else {

    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        // 空格后面就要接属性了
        return beforeAttributeName;
    } else if (c == "/") {
        // 自封闭标签
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c == ">") {
        // 普通开始
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == ">") {
        return data;
    } else if (c == "=") {
        return beforeAttributeName;
    } else {
        currentAttribute = {
            name:"",
            value:""
        }
        return attributeName;
    }
}

function selfClosingStartTag(c) {
    if (c == ">") {
        currentToken.isSelfClosing = true;
        return data;
    } else if (c == EOF) {
        // error
    } else {
        // error
    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
}