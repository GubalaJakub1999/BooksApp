const { render } = require("sass")

const templates = {
    menuBook: Handlebars.compile(document.querySelector('.template-book').innerHTML)
};
render(){
    for(let book of dataSource.books){
        const generatedHTML = templates.menuBook(books);

    }
};