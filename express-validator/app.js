const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Reused  project from MongoDB-MVC-
//  implemented and used of Express Validator  
//  on at three of the endpoints

app.use(express.json());

const UsersController = require('./Controllers/UsersController');
const PostsController = require('./Controllers/PostsController');

app.get('/users', UsersController.Index);
app.post('/users',UsersController.Insert);
app.get('/users/:id', UsersController.Show);
app.delete('/users/:id', UsersController.Delete);
app.put('/users/:id', UsersController.Update);


app.get('/posts', PostsController.Index);
app.post('/posts',  PostsController.Insert);
app.get('/posts/:id', PostsController.Show);
app.delete('/posts/:id', PostsController.Delete);
app.put('/posts/:id', PostsController.Update);

app.listen('3000', () => console.log('Server listening on port 3000'));






































// app.get('/', function(req, res){
//     db.collection('Posts').insertMany(
//         [
//             {
//                 'title': 'My first post',
//                 'text': '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"',
//                 'image': 'postimg.jp,
//                 'password': 'kiselomleko94',
//                 'avatar': 'myimage12.jpg',
//                 'group' : 'admin',
//                 'subscriptions': [1, 11, 2],
//                 'messages': [
//                     {
//                         'id': 1,
//                         'body': 'fsafasfasfasf',
//                         'to': 2
//                     }
//                 ]
//             }
            
//         ]
//     )
    

// })

