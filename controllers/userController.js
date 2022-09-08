const url = require('url');
const dbo = require('../db/conn');
const form = ((req, res) => {
    res.render('register.ejs');
});
const usersearch = ((req, res) => {
    res.render('usersearch.ejs');
});
const userlogin = ((req, res) => {
    res.render('login.ejs');
});
const userregister = ((req, res) => {
    var file = req.files.userphoto;
    var filename = new Date().getTime() + "" + parseInt(Math.random() * 10000) + file.name;
    file.mv('./public/profiles/' + filename, function (err) {
        if (!err) {
            console.log('file uploaded');
        } else {
            console.log('failed to file upload');
        }
    });
    const dbConnect = dbo.getDb();
    var userrecord = {
        username: req.body.username, userphoto: filename, useremail: req.body.useremail, usermobile: req.body.usermobile, userpassword: req.body.userpassword, gender: req.body.
            gender, useraddress: req.body.useraddress, usercountry: req.body.usercountry
    };
    dbConnect.collection('userdata').find({ useremail: req.body.useremail }).toArray(function (err, result) {
        if (err) {
            res.send('Error');
        } else if (result.length < 1) {
            dbConnect.collection('userdata').insertOne(userrecord, function (err, result2) {
                if (err) {
                    res.send('Error');
                } else {
                    res.send(
                        `<script>
                            alert("Register Success");
                            window.location.assign('/user/userlist');
                            </script>`);
                }
            });
        }
        else {
            res.send(
                `<script>
                    alert("This Email Allredy Register Try To Login..");
                    window.location.assign('/user/form');
                    </script>`);
        }
    });
});
const loginprocess = ((req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect.collection('userdata').findOne({ useremail: req.body.useremail, userpassword: req.body.userpassword }, function (err, result) {
        if (err) {
            res.send('Error');
        } else if (result) {
            var userid = result._id.toString();
            req.session.user_id = userid;
            res.redirect('/user/userprofile');
        }
        else {
            res.send(
                `<script>
            alert("Login Faild Please Try Again");
            window.location.assign('/user/userlogin');
            </script>`);
        }
    });
});
const userprofile = ((req, res) => {
    const ObjectId = require('mongodb').ObjectID;
    if(req.session.user_id) {
        const dbConnect = dbo.getDb();
        dbConnect.collection('userdata').findOne({ _id: ObjectId(req.session.user_id) }, function (err, result) {
            if (err) {
                res.send(
                    `<script>
        alert("You Are Not Login Please Login");
        window.location.assign('/user/userlogin');
        </script>`);
            }
            else {
                res.render('profile.ejs', { "userdata": result });
            }
        });
    }
    else {
        res.send(
            `<script>
alert("You Are Not Login Please Login");
window.location.assign('/user/userlogin');
</script>`);
    }
});
const userlist = ((req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect.collection('userdata').find({}).toArray(function (err, result) {
        if (err) {
            res.send('Error');
        } else {
            var data = result;
            res.render('userlist.ejs', { "userdata": data });
        }
    });
})
const userlogout = ((req, res) => {
    req.session.destroy();
    res.redirect('/user/userlogin');

});
const userdelete = ((req, res) => {
    const urldata = url.parse(req.url, true).query.id;
    const ObjectId = require('mongodb').ObjectID;
    const dbConnect = dbo.getDb();
    dbConnect.collection('userdata').deleteOne({ _id: ObjectId(urldata) });
    res.send(
        `<script>
        alert("User Deleted Success");
        window.location.assign('/user/userlist');
        </script>`);
});
const useredit = ((req, res) => {
    const editid = url.parse(req.url, true).query.id;
    const ObjectId = require('mongodb').ObjectID;
    const dbConnect = dbo.getDb();
    dbConnect.collection('userdata').findOne({ _id: ObjectId(editid) }, function (err, result) {
        if (err) {
            res.send('Error');
        } else {
            res.render('useredit.ejs', { "userdata": result });
        }
    });
});
const userupdate = ((req, res) => {
    var file = req.files.userphoto;
    var filename = new Date().getTime() + "" + parseInt(Math.random() * 10000) + file.name;
    file.mv('./public/profiles/' + filename, function (err) {
        if (!err) {
            console.log('file uploaded');
        } else {
            console.log('failed to file upload');
        }
    });
    var usernewrecord = {
        username: req.body.username, userphoto: filename, useremail: req.body.useremail, usermobile: req.body.usermobile, userpassword: req.body.userpassword, gender: req.body.
            gender, useraddress: req.body.useraddress, usercountry: req.body.usercountry
    };
    const dbConnect = dbo.getDb();
    const updateid = req.body.id;
    const ObjectId = require('mongodb').ObjectID;
    dbConnect.collection('userdata').updateOne({ _id: ObjectId(updateid) }, { $set: usernewrecord }, function (err, result) {
        if (err) {
            res.send('Error');
        } else {
            res.send(
                `<script>
                 alert("User Record Updated Success");
                 window.location.assign('/user/userlist');
                 </script>`);
        }
    });
});
const searchuser = ((req, res) => {
    const dbConnect = dbo.getDb();
    const searchemail = url.parse(req.url, true).query.useremail;
    // const ObjectId = require('mongodb').ObjectID;
    dbConnect.collection('userdata').find({ useremail: searchemail }).toArray(function (err, result) {
        if (err) {
            res.send('Error');
        } else {
            var data = result;
            res.render('searchresult.ejs', { "userdata": data });
        }
    });
})
module.exports = {
    form,
    usersearch,
    userlogin,
    userregister,
    loginprocess,
    userprofile,
    userlist,
    userlogout,
    userdelete,
    useredit,
    userupdate,
    searchuser,
}