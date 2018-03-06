var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "free_lancer"
});

var port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 res.setHeader('Cache-Control', 'no-cache');
 next();
});



app.post('/signup', function(request, response){
  const saltRounds = 10;
  
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(request.body.password, salt, function(err, hash) {
      var sql= "INSERT into User(name, password, email, created_at) values ('" + request.body.name + "',  '" + hash + "', '"+ 
      request.body.email + "',  '"+ new Date().toLocaleString() + "')";
      con.query(sql,function(err,rows){
        if(err) throw err;
      });
      var get_user_query = "Select * from User where email = '" + request.body.email + "' and password = '" + hash + "'";
      con.query(get_user_query,function(err,rows){
        if(err) throw err;
        response.json({rows: rows[0]})
      });
    });
  });   
});

app.post('/signin', function(request, response){
  var sql = "Select * from User where email = '" + request.body.email + "'";
  con.query(sql,function(err,rows){
    if(err) throw err;
    console.log(rows[0]);
    if(rows.length >= 1)
    {
      isPasswordCorrect = bcrypt.compareSync(request.body.password, rows[0].password);
      isPasswordCorrect ? response.json({correctCredentials: true, rows: rows[0]}) :  response.json({correctCredentials: false});
    }
    else{
      response.json({correctCredentials: false});
    }
  });
});

app.get('/get_user', function(request, response){
  var sql = "Select * from User where id = '" + request.query.id + "'";
  con.query(sql,function(err,rows){
    if(err) throw err;
    console.log(rows.length);
    rows.length >= 1 ? response.json({correctCredentials: true, rows: rows[0]}) :  response.json({correctCredentials: false});
  });
});

app.post('/update_profile', function(request, response){
  var sql = "UPDATE User SET email = '" + request.body.email + "', name = '" + request.body.name + "', skills= '" + request.body.skills + 
  "', about_me='" + request.body.about_me + "', phone_number='" + request.body.phone_number + "' where id='" + request.body.id + "'";
  console.log(sql);
  con.query(sql,function(err,rows){
    if(err) throw err;
    console.log(rows.length);
    rows.length >= 1 ? response.json({correctCredentials: true, rows: rows[0]}) :  response.json({correctCredentials: false});
  });
});

app.post('/create_project', function(request, response){
  console.log(request.body);
  var sql= "INSERT into Project(title, description, skills_required, min_budget, max_budget, user_id, created_at) values ('" + request.body.title + "',  '" + 
  request.body.description+ "', '" + request.body.skills_required + "', '" +  request.body.minimum_budget + "', '" + request.body.maximum_budget + "', '" 
  + request.body.user_id + "', '" + new Date().toLocaleString() + "')";
  console.log(sql);
  con.query(sql,function(err,rows){
    if(err) throw err ;
  });

  var get_user_query = "Select * from User where email = '" + request.body.email + "' and password = '" + request.body.password + "'"
  con.query(get_user_query,function(err,rows){
    // if(err) throw err;
    console.log(rows[0]);
    response.json({rows: rows[0]})
  });
});

app.get('/get_all_projects', function(request, response){
  var sql = "SELECT Project.*, User.name, count(Bid.project_id) as total_bids from Project left join Bid on" + 
  "(Project.id = Bid.project_id) LEFT JOIN User on (Project.user_id = User.id) group by Project.id";

  con.query(sql,function(err,rows){
    if(err) throw err;
    console.log(rows);
    rows.length >= 1 ? response.json({data_present: true, rows: rows}) :  response.json({data_present: false});
  });
});

app.get('/get_project_bids', function(request, response){
  console.log(request.query);
  //var a = request.query.project_id;
  var sql = "Select b.id as 'id', u.id as 'freelancer_id', u.name as 'free_lancer_name', p.user_id as 'project_owner', b.price as 'bid_price', " +
  "b.number_of_days as 'days' from User u, Project p, Bid b where b.user_id = u.id and b.project_id = p.id and p.id = '" + request.query.pid + "'";
  console.log(sql);
  con.query(sql, function(err,rows){
    if(err) throw err;
    //console.log(rows.length);
    rows.length >= 1 ? response.json({data_present: true, rows: rows}) :  response.json({data_present: false});
  });
});

app.get('/get_project_detail', function(request, response){
  var sql = "Select Project.*, AVG(Bid.number_of_days) as days from Project INNER JOIN Bid on (Project.id = Bid.project_id) where Project.id = '" 
  + request.query.p_id  + "'";
  console.log(sql);
  console.log(request.query);
  con.query(sql,function(err,rows){
    if(err) throw err;
    console.log(rows.length);
    rows.length >= 1 ? response.json({data_present: true, rows: rows[0]}) :  response.json({data_present: false});
  });
});

app.post('/submit_bid', function(request, response){
  console.log(request.body);
  var sql = "Select * from Bid where user_id = '" + request.body.user_id + "' and project_id = '" + request.body.project_id + "'";
  con.query(sql,function(err,rows){
    if(err) throw err ;
    if(rows.length >=1){
      var sql_query = "Update Bid Set number_of_days = '" + request.body.no_of_days + "', price = '" + request.body.price + "' where project_id = '" +
      request.body.project_id + "' and user_id = '" + request.body.user_id + "'";
    }
    else{
      var sql_query= "INSERT into Bid(project_id, user_id, number_of_days, created_at, price) values ('" + request.body.project_id + "',  '" + 
      request.body.user_id + "', '" + request.body.no_of_days + "', '" + new Date().toLocaleString() + "', '" + request.body.price + "')";
      console.log(sql);
    }
    con.query(sql_query,function(err,rows){
      if(err) throw err ;
      response.json({rows: rows})
    });
  });
});

app.post('/check_email', function(request, response){
  console.log(request.body);
  var sql = "Select * from User where email='" + request.body.email + "'";
  con.query(sql,function(err,rows){
    if(err) throw err;
    console.log(rows.length);
    rows.length >= 1 ? response.json({emailPresent: true}) :  response.json({emailPresent: false});
  });
})

app.post('/hire_user', function(request, response){
  console.log(request.body);
  var sql = "UPDATE Project SET assigned_to = '" + request.body.free_lancer_id + "' where id='" + request.body.p_id + "'";
  console.log(sql);
  console.log(sql);
  con.query(sql,function(err,rows){
    if(err) throw err;
    console.log(rows.length);
    rows.length >= 1 ? response.json({dataUpdated: true, rows: rows[0]}) :  response.json({dataUpdated: false});
  });
});
// get_all_user_bid_projects

app.get('/get_all_user_bid_projects', function(request, response){
  console.log(request.query)
  var sql = "Select Bid.*, Project.title, User.name from Bid left JOIN Project on (Bid.project_id = Project.id)" + 
  "LEFT JOIN User on (Bid.user_id = User.id) where Bid.user_id= '" + request.query.u_id + "'";
  console.log(sql)
  con.query(sql,function(err,rows){
    if(err) throw err;
    console.log(rows);
    rows.length >= 1 ? response.json({data_present: true, rows: rows}) :  response.json({data_present: false});
  });
  // response.json("hello");
});


app.post('/get-bid-value-for-user', function(request, response){
  console.log(request.body)
  // var sql = "Select Bid.*, Project.title, User.name from Bid left JOIN Project on (Bid.project_id = Project.id)" + 
  // "LEFT JOIN User on (Bid.user_id = User.id) where Bid.user_id= '" + request.query.u_id + "'";
  // console.log(sql)
  var sql = "Select * from Bid where user_id = '" + request.body.user_id + "' and project_id = '" + request.body.project_id + "'";
  console.log(sql)
  con.query(sql,function(err,rows){
    if(err) throw err;
    console.log(rows);
    rows.length >= 1 ? response.json({data_present: true, rows: rows[0]}) :  response.json({data_present: false});
  });
});

app.listen(port, function() {
 console.log(`api running on port ${port}`);
});

// SELECT Project.*, User.name, count(Bid.project_id) as total_bids from Project left join Bid on (Project.id = Bid.project_id) LEFT JOIN User on 
// (Project.user_id = User.id) where Project.user_id = '100' group by Project.id
// SELECT Project.*, User.name, AVG(Bid.number_of_days) as total_bids from Project left join Bid on (Project.id = Bid.project_id) LEFT JOIN User on 
// (Project.user_id = User.id) where Project.user_id = '100' group by Project.id

// Select Project.*, User.name, Bid.number_of_days, Project.id, AVG(DISTINCT Bid.number_of_days) as days from Project left join Bid on (Project.id = Bid.project_id) LEFT JOIN User on (Project.user_id = User.id) where Bid.user_id = '100' GROUP BY Bid.id

// Select AVG(Bid.number_of_days) as total, Project.title, User.name from Bid left JOIN Project on (Bid.project_id = Project.id) LEFT JOIN User on (Bid.user_id = User.id) GROUP BY Bid.id


// SELECT AVG(Bid.number_of_days), Project.id, Project.title from Bid INNER JOIN Project on (Bid.project_id=Project.id) GROUP BY Project.id
// SELECT AVG(Bid.number_of_days), Bid.number_of_days, Project.id, Project.title from Bid INNER JOIN Project on (Bid.project_id=Project.id) where Bid.user_id = '100' GROUP BY Project.id
// SELECT AVG(Bid.number_of_days), User.name, Bid.number_of_days, Project.id, Project.title from Bid INNER JOIN Project on (Bid.project_id=Project.id) INNER JOIN User on (Bid.user_id = User.id) where Bid.user_id = '100' GROUP BY Project.id, Bid.number_of_days





// select averageTable.avgDays,title,averageTable.id,X.number_of_days,c.name, c.id
// from (select avg(b.number_of_days) as avgDays,p.title,p.id from Bid b,Project p where b.project_id=p.id group by p.id) as averageTable, Bid X ,User c where X.project_id=averageTable.id and X.user_id=100 
// and X.user_id =c.id