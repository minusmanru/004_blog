import { Component } from './../core/component';
import { apiService } from './../services/api.service';
import { TransformService } from '../services/transform.service';
import { renderPost } from '../templates/post.template';

export class PostsComponent extends Component {
    constructor(id, {loader}) { // {loader} здесь делаем деструктуризацию, и забираем только то что нужно
        super(id)
        this.loader = loader
    }

    init() { // прослушка кнопки сохранить
        this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
        this.loader.show()
        const fbData = await apiService.fetchPost()
        const posts = TransformService.fbObjectToArray(fbData)
        // posts.map(post => renderPost(post)) - это массив, поэтому сразу его соеденяем в строку через пробел с помощью .join(' ')
        const html = posts.map(post => renderPost(post, {withButton: true}))  // {withButton: false} - рендер кнопки
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', html.join(' ')) // .join(' ') выводит элементы массива заменяя запятую на пробел

    }

    onHide() {
        this.$el.innerHTML = ''
    }
} 

// function renderPost(post) {
//     const tag = post.type === 'news'
//         ? '<li class="tag tag-blue tag-rounded">Новость</li>'
//         : '<li class="tag tag-rounded">Заметка</li>'

//     const button = (JSON.parse(localStorage.getItem('favorites')) || []).includes(post.id)
//         ? `<button data-id='${post.id}' class="button-round button-small button-danger button-save">Удалить</button>`
//         : `<button data-id='${post.id}' class="button-round button-small button-primary button-save">Сохранить</button>`
//    return  `
//         <div class="panel">
//             <div class="panel-head">
//                 <p class="panel-title">${post.title}</p>
//                 <ul class="tags">
//                 ${tag}
//                 </ul>
//             </div>
//             <div class="panel-body">
//                 <p class="multi-line">${post.fulltext}</p>
//             </div>
//             <div class="panel-footer w-panel-footer">
//                 <small>${post.date} </small> 
//                 ${button}
//             </div>
//         </div>    
//     `
// }

function buttonHandler(event) {
    const $el = event.target
    if (event.target.classList.contains('button-save')) { 
        const id = event.target.dataset.id
        // нужно положить id в localStorage, если он там, то удалить 
        // JSON.parse() - распарсиваем объект.  Если не найдет 'favorites' и вернёт null, то ставим пустой массив
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [] 
        console.log(favorites)

        if (favorites.includes(id)) { // удаляем из массива - переопределяя его.
            $el.textContent = 'Сохранить'
            $el.classList.add('button-primary')
            $el.classList.remove('button-danger')
            favorites = favorites.filter(fId => fId !== id) // .filter() - функция итератор, на каждой итерации выдаст fId из массива
        } else {
            favorites.push(id) // добавляем элемент в массив
            $el.textContent = 'Удалить'
            $el.classList.remove('button-primary')
            $el.classList.add('button-danger')
            
        }

        localStorage.setItem('favorites', JSON.stringify(favorites)) 
    } 
}