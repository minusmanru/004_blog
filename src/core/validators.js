export class Validators { // у класса будут кастомные валидаторы 
    static required(value = '') { // валидатор  проверяет пустой control или нет. принимает value  и возвращает булеан . по умолчанию пустая строка value = ''
    debugger; 
        return value && value.trim() // Метод trim() удаляет пробельные символы с начала и конца строки.
    
    } 
}