import { Validators } from './validators';

export class Form {

    constructor(form, controls) { // параметр - form, то где содержится html элемент формы, и объект controls
        this.form = form
        this.controls = controls
    }

    value() { // метод value() - отдаст объект содержащий все значения формы
        const value = {} // переменная  value - это объект
        // Object.keys( ) возвратит массив ключей
        Object.keys(this.controls).forEach(control => { // методом forEach проходим по каждому из ключей. ключ control - это либо fulltext либо title
            value[control] = this.form[control].value // объекту value[] задаём ключ control - клячами будут либо fulltext либо title
        } ) // на каждой итерации получим строку
        return value 
    }

    isValid() { // val2 метод вернёт булеан значение, основанное на значениях внутри формы, и валидаторов которые передаём
        let isFormValid = true // переменная будет менятся и по умолчанию будет валидна

        Object.keys(this.controls).forEach(control => { // с помощью Object.keys, пробегаем по всем controls
            const validators = this.controls[control] // получаем список валидаторов
            console.log(validators , ' -- validators')
            
            let isValid = true // переменная служит для конкрутного валидатора
            // пробегаем по массиву const validators, где каждый элемент это функция валидатор. validator - возвращает булеан значение
            validators.forEach(validator => { // тут определяем валиден ли текущий контрол (   forEach(control =>  )  - let isValid 
                isValid  =  validator(this.form[control].value) // для этого переопределяем переменную let isValid, и передаём в validator() текущее значение control
            })
        }) 

        return isFormValid
    }
}

console.log(Form.value);