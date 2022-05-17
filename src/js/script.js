
const templates = {
  menuBook: Handlebars.compile(document.querySelector('#template-book').innerHTML)
};
function render(){
  let html = '';

  for(let book of dataSource.books){
    const generatedHTML = templates.menuBook(book);

    html += generatedHTML;
  }


  const bookListContainer = document.querySelector('.books-list');
  bookListContainer.innerHTML = html;
}
const filters = [];
function initActions(){
  const favoriteBooks = [];
  const bookCovers = document.querySelectorAll('.book__image');
  for(const book of bookCovers){
    book.addEventListener('dblclick', function(event){
      event.preventDefault();
      if(event.target.offsetParent.classList.contains('book__image')){
        const bookID = event.target.offsetParent.getAttribute('data-id');
        if(!book.classList.contains('favorite')){
          book.classList.add('favorite');
          favoriteBooks.push(bookID);
        } else {
          event.target.offsetParent.classList.remove('favorite');
          const indexBook = favoriteBooks.indexOf(bookID);
          favoriteBooks.splice(indexBook, 1);
        }
      }
    });
  }
  const filters = [];
  const form = document.querySelector('.filters');
  form.addEventListener('click', function(event){
    const filterValue = event.target.value;
    if(
      event.target.tagName == 'INPUT'
        &&
        event.target.type == 'checkbox'
        &&
        event.target.name == 'filter'
    ){
      if(event.target.checked == true){
        filters.push(filterValue);
        console.log(filters);
      } else {
        const indexForm = filters.indexOf(filterValue);
        filters.splice(indexForm, 1);
        console.log(filters);
      }
    }
    filterBooks();
  });
}

function filterBooks(){
  for(let book of dataSource.books){


    let shouldBeHidden = false;

    for(const filter of filters){
      if(!book.details[filter]){
        shouldBeHidden = true;
        break;
      }
    }
    const id = book.id;
    const item = document.querySelector('.book__image[data-id="'+id+'"]');

    if(shouldBeHidden == true){
      item.classList.add('hidden');
    } else if(shouldBeHidden == false){
      item.classList.remove('hidden');
    }
  }
}

render();
initActions();
