import {Component} from '../core/component'

export class NavigationComponent extends Component {
    constructor(id) {
        super(id)

        this.tabs = []
    }

    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this))
    }

    registerTabs(tabs) { // публичный метод принимающий tabs
        this.tabs = tabs
    }
}

function tabClickHandler(event) {
    event.preventDefault()
    if (event.target.classList.contains('tab')) {
        Array.from(this.$el.querySelectorAll('.tab')).forEach(tab => { // собрали все элементы '.tab' в массив с помощью Array.from, перебераем каждый с помощью .forEach
            tab.classList.remove('active') // у всех табов удаляем класс 'active'
        }) 
        event.target.classList.add('active') // табу по которому нажали, добавляем класс 'active'
        const activeTab = this.tabs.find(t => t.name === event.target.dataset.name)
        this.tabs.forEach(t => t.component.hide()) // скрываем кнтент у каждого таба
        activeTab.component.show() // у любого таба компонента, еть метод show() показываем контент активного таба
    }
}