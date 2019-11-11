export class TransformService {
    static fbObjectToArray(fbData) {
        // вместо .forEach(key используем метод map, который возвратит новый, преобрзованный массив. 
        // и что бы это работало, перед Object.keys пишем return что бы вернуть данный массив
        return Object.keys(fbData).map(key => { 
            const item = fbData[key]
            item.id = key
            return item
            
        })

    }   
}