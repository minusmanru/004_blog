import {HeaderComponent} from './components/header.component' // импортируем HeaderComponent из файла header.component
import {NavigationComponent} from './components/navigation.component'
import { CreateComponent } from './components/create.component';
import { PostsComponent } from './components/posts.component';
import { FavoriteComponent } from './components/favorite.cponent';

const header = new HeaderComponent('header') // и создаём сам header

const navigation = new NavigationComponent('navigation')
const posts = new PostsComponent('posts')
const create = new CreateComponent('create')
const favorite = new FavoriteComponent('favorite')

navigation.registerTabs([ // сюда передаём массив из объектов из NavigationComponent
    // Регистрация табов - tabs .   описываем название объекта и компонент ассоцоируемый с названием объекта 
    {name: 'create', component: create},
    {name: 'posts', component: posts},
    {name: 'favorite', component: favorite}
])

