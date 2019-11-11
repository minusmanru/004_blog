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
            value[control] = this.form[control].value.trim() // объекту value[] задаём ключ control - клячами будут либо fulltext либо title
        } ) // на каждой итерации получим строку
        return value 
    }

    clear() {
        Object.keys(this.controls).forEach(control => { 
            this.form[control].value = ''
        } )
    }

    isValid() { // val2 метод вернёт булеан значение, основанное на значениях внутри формы, и валидаторов которые передаём
        var isFormValid = true // переменная будет менятся и по умолчанию будет валидна

        Object.keys(this.controls).forEach(control => { // с помощью Object.keys, пробегаем по всем controls
            const validators = this.controls[control] // получаем список валидаторов
            
            let isValid = true // переменная служит для конкретного валидатора
            // пробегаем по массиву const validators, где каждый элемент это функция валидатор. validator - возвращает булеан значение
            validators.forEach(validator => { // тут определяем валиден ли текущий контрол (   forEach(control =>  )  - let isValid 
                 // для этого переопределяем переменную let isValid, и передаём в validator() текущее значение control
                isValid  =  validator(this.form[control].value) && isValid // что бы учитывать предыдущее значение валидатора, добавляем  && isValid
            })
            
            

            if (!isValid) {
                setError(this.form[control]) 
            } 
            
            else {
                clearError(this.form[control])
            }
           

            isFormValid = isFormValid && isValid
        }) 

        return isFormValid
    }
}

function setError($control) { // сюда принимаем объект this.form[control] параметром - $control
    clearError($control)
    const error = '<p class="validation-error">Введите корректное значение</p>'
    $control.classList.add('invalid')
    $control.insertAdjacentHTML('afterEnd', error)
    console.log($control);
    
} 

function clearError($control) {
    
   $control.classList.remove('invalid')
   if ($control.nextSibling) {
    $control.closest('.form-control').removeChild($control.nextSibling)
    
   }
   
//    var cc = $control.parentElement.lastChild
//    $control.parentElement.removeChild(cc)

    
}
