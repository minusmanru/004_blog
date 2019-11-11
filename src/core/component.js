export class Component { // клас от которого м.б. наследоваться 
    constructor(id) { // принимает id  отвечающий за корневой блок(элемент) компонента например header или form
        this.$el = document.getElementById(id) // $el - так называем пременную в которой DOM компонент
        this.init()
        //console.log('log - 4 ',this.$el);
        
    }

    init() {}  // вызываем этот метод когда получим значение this.$el
    
    onShow() {}

    onHide() {}
    
    hide() {
        this.$el.classList.add('hide')
        this.onHide()
    }
    show() {
        this.$el.classList.remove('hide')  
        this.onShow()      
    }
}