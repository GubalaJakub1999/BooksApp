
const templates = {
  menuBook: Handlebars.compile(document.querySelector('#template-book').innerHTML)
};

function render(){
  let html = '';

  for(let book of dataSource.books){
    const ratingBgc = determineRatingBgc(book.rating);
    const ratingWidth = book.rating * 10;
    const generatedHTML = templates.menuBook({
      id: book.id,
      price: book.price,
      name: book.name,
      image: book.image,
      rating: book.rating,
      ratingBgc,
      ratingWidth,
    });

    html += generatedHTML;

  }


  const bookListContainer = document.querySelector('.books-list');
  bookListContainer.innerHTML = html;


}
const favoriteBooks = [];
const filters = [];
function initActions() {

  const booksContainer = document.querySelector('.books-list');

  booksContainer.addEventListener('dblclick', function (event) {

    event.preventDefault();

    if (event.target.offsetParent.classList.contains('book__image')) {

      const bookId = event.target.offsetParent.getAttribute('data-id');

      if (!favoriteBooks.includes(bookId)) {

        favoriteBooks.push(bookId);

        event.target.offsetParent.classList.add('favorite');

      } else {

        const indexOfbookId = favoriteBooks.indexOf(bookId);

        favoriteBooks.splice(indexOfbookId, 1);

        event.target.offsetParent.classList.remove('favorite');
      }
    }
  });
  const filter = document.querySelector('.filters');
  filter.addEventListener('click', function(event){
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

function determineRatingBgc (rating) {
  let background = '';

  if(rating <= 6){
    background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  }else if(rating > 6 && rating <= 8){
    background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  }else if(rating > 8 && rating <= 9){
    background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  }else if(rating > 9){
    background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }
  return background;
}

render();
initActions();
