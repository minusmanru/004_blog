import { Component } from '../core/component';
import { Form } from '../core/form';
import { Validators } from '../core/validators'; // val0.1 для валидаторов класс не нужно создавать

export class CreateComponent extends Component {
    constructor(id) {
        
        super(id)
         //this.form = null даём значение форме
       //debagger 
        //console.log('log form ',this.$el);
    }

    init() { // метод init инициализирует компонент, и выполнять действия после его инициализации
        this.$el.addEventListener('submit', submitHandler.bind(this))   // прослушка события на кнопке формы
        /*
            инициализируем форму - this.form = new Form(
            в конструктор передаем два элемента, первый - this.$el отвечает за объект формы  - это блок формы со всеми полями    
            второй - объект конфигурации контролов содержащихся в форме, которые нужно будет валидировать


        */  
       
        this.form = new Form(this.$el, { 
            title: [Validators.required, Validators.minLength(5)], // val0.2  здесь метод не вызывается, а передаём ссылку на этот статический метод
            fulltext: [Validators.required, Validators.minLength(6)] 
        }) // controls из Form представлены в виде оъекта, где ключ (title:fulltext:) - это название контрола, а значение - [Validators.required] - массив валидаторов
       
    }

} 

function submitHandler(event) {
    event.preventDefault() // отмена перезагрузки формы

    if (this.form.isValid()) { // val1   если форма валидная, выполняем код

        const formData = {   // получаем значения из формы
            type: this.$el.type.value, // получаем значение 
            ...this.form.value() // объеденяем объекты, добавляя в const formData    .form.value()
        }
        this.form.clear() // очищаем форму после сохранения значений в переменную
        console.log('submit  + ', formData);
    } 


}

