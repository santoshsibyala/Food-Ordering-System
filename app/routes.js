var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            return next(err);
        }
        // return all todos in JSON format
        res.json(todos);
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all food items
    app.get('/api/foods', function (req, res) {
        // use mongoose to get all food items in the database
        getTodos(res);
    });

    // create food item and send back all food items after creation
    app.post('/api/foods', function (req, res) {
        // create a food item, information comes from AJAX request from Angular
        Todo.create({
            food_item: req.body.name,
            price:req.body.price,
            done: false
        }, function (err, todo) {
            if (err){
                res.send(err);
            }
            else{
                getTodos(res);
            }
            // get and return all the food items after you create another    
        });
    });

    // delete a todo
    app.delete('/api/foods/:food_id', function (req, res) {
        Todo.remove({
            _id: req.params.food_id
        }, function (err, todo) {
            if (err){
                res.send(err);
            }
            else{
                getTodos(res);
            }
        });
    });
    //total cost
    app.get('/api/total',function (req,res){
        Todo.find(function (err, todos) {
            if (err) {
                return next(err);
            }
            else{
                var sum=0;
                for(var i=0; i<todos.length;i++){
                    sum=sum+Number(todos[i].price);
                }
console.log("sum is "+sum);
                res.send({'sum':sum});
            }
           
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};