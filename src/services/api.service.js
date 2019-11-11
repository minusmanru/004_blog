// сервисы - это любая сущность. Ниже один из вариантов создания сервиса. 
class ApiService { // тут описываем статические, или не статические методы
    constructor(baseUrl) { // ссылка обрабатывается в конструкторе
        this.url = baseUrl
    }

    // метод создаёт новый пост
    async createPost(post) { // метод принимает объект post
        try { //обработчик ошибок
            const request = new Request(this.url + '/posts.json', { // в FBase будет новая запись в виде объекта где в поле posts будут хранится посты
                // второй параметр принимаемый в Request - набор опций
                method: 'post', // method: - это первая опция. Для создания объекта в DB, используем метод 'post' - это правило rest API
                body: JSON.stringify(post)   // в 'post' запросе, нужно передать данные. js объекты, не могут передаваться по сети.
                // JSON.stringify()  -  для т.что бы превратить объект post в строку 
            })
            // fetch() - метод для обращения на сервер, куда передаём урл, или объект request. Нужно подождать пока объект request создастся
            // для этого добавляем async к createPost(post) b await к fetch()
            const response = await fetch(request) // метод fetch возвращает объект - response у которого есть метод json() - await response.json()
            return await response.json() // возвращает промис
        } catch (error) { // в случае ошибок console.error(error)
            console.error(error)
        }
    }


}

// const apiservice с маленькой буквы п.ч. это экземплzр класса
export const apiService = new ApiService('https://blog-aff54.firebaseio.com') // в конструктор передаём ссылку