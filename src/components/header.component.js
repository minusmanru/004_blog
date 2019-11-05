import {Component} from '../core/component'     // импортируем Component в этот файл
export class HeaderComponent extends Component { // наследуемся от Component
    constructor(id) {
        super(id) // super() - это конструктор из Component
    } 

    init() {
        if (localStorage.getItem('visited')) { // проверяем localStorage, и скрываем блок 
            this.hide()
        }
        const btn = this.$el.querySelector('.js-header-start')
        btn.addEventListener('click', buttonHeandler.bind(this))
        
    }
}

function buttonHeandler() {
    localStorage.setItem('visited', JSON.stringify(true)) // пишем в localStorage что страница была открыта, для того, чтобы при её обновлении блок всегда скрывался
    this.hide()
}