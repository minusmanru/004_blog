import { Component } from './../core/component';
import { apiService } from '../services/api.service';
import { renderPost } from '../templates/post.template';


export class FavoriteComponent extends Component {
    constructor(id, options) { // можно принять - {loader}, как в posts или options
    super(id)
    this.loader = options.loader
    }
    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this))

    }

    async onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        const html = renderList(favorites) // renderList(favorites) вернёт - return `<p class="center">Вы , поэтому сохраняем в const html 
        this.$el.insertAdjacentHTML('afterbegin', html)
    }

    onHide() {
        this.$el.innerHTML = ''
    }
    
} 


function renderList(list = []) {
    if (list.length) {  // если в массиве что то есть, выполняем код
        return `
            <ul>
                ${list.map(i => `<li><a href="#" class="js-link">${i}</a></li>`).join(' ')}
            </ul>
        `
    }

    return `<p class="center">Вы не добавили ничего в избранное!</p>`
}
 
async function linkClickHandler(event) {
    event.preventDefault()
    if (event.target.classList.contains('js-link')) {
       
        const postId = event.target.textContent
        this.$el.innerHTML = ''

        this.loader.show()
        const post = await apiService.fetchPostById(postId)
        
        this.loader.hide()
        // если передавать просто false то не сохранится функционал, по этому передаём {withButton: false}
        this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton: false})) 

    }
}




