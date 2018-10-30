// Задача использовать наш express и body - parser.
// С помощью всего это написать не сложный REST - api 
// с методами GET / POST / PUT / DELETE, как мы это делали на занятии.
// Приложение будет чуть сложнее.У нас опять же есть продукты в 
// виде сложной структуры данных.
// написать код, которым мы можем добавлять витрину, 
// продукцию на ней и конкретный продукт(+ получать, менять, удалять)
// там, где есть id, придумать или погуглить способ учёта этих id, 
// чтобы они были уникальными в пределах своей области видимости.
// То есть, например чтобы в отделе не было дублирующихся id витрин 
// и id удалённых витрин не появлялись вновь, то есть они закреплены 
// были посметрно))

var express = require('express');
var bodyParser = require('body-parser');
var store = require('./store');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.send(store);
});

app.get('/store/:id', function(req, res) {
    var myStore = store.find(function(department) {
        return department.id === +req.params.id;
    })

    res.send(myStore);
});

app.post('/products', function(req, res) {
    var cases = {
        id: Date.now(),
        nameCases: req.body.nameCases,
        cases: req.body.cases
    };

    store.push(cases);
    res.send(store);
});

app.put('/products/:id', function (req, res) {
    
    store.find(function (department) {
        if (department.id === +req.params.id) {

            var { nameCases, cases} = req.body;

            department.nameCases = nameCases;
            department.cases = cases;
            
            return true;
        }
    });

    res.send(store);
});

app.delete('/products/:id', function (req, res) {
    store.find(function (department) {
        if (department.id === +req.params.id) {
            store.splice(store.indexOf(department), 1);
            return true;
        }
    });

    res.send(store);
});

app.listen(3000, function() {
    console.log('Start listening');
});