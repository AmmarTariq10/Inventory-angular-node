const mysql = require('mysql');
const defaultRes = {
    error: false,
    message: 200
};
const errRes = {
    error: true,
    message: 'An unhandled error occured, please contact your Administrator'
};

function setMsgBody(useBody, msgBody) {
    const dupMsg = useBody;
    dupMsg.message = msgBody;
    return dupMsg;
}

module.exports = function (app) {
    const mysqlObject = mysql.createConnection({
        host: 'localhost',
        user: 'ammar',
        password: '123456',
        database: 'sales'
    });

    mysqlObject.connect();
    // connection.end();

    app.post('/get/inventory', (req, res) => {

        mysqlObject.query('SELECT * FROM `inventory`', function (error, results, fields) {
            if (error) {
                res.send(setMsgBody(errRes, error));
            } else {
                res.send(setMsgBody(defaultRes, results));
            }
        });

    });


    app.post('/add/inventory/item', (req, res) => {

        mysqlObject.query('INSERT INTO `inventory` (`name`,`quantity`,`price`) VALUES ("' + req.body.name + '", ' + req.body.quantity + ', ' + req.body.price + ')', function (error, results, fields) {
            if (error) {
                res.send(setMsgBody(errRes, error));
            } else {
                res.send(setMsgBody(defaultRes, results));
            }
        });

    });


    app.post('/get/inventory/item', (req, res) => {

        const getterQuery = 'SELECT * FROM `inventory` WHERE `iid`='.concat(req.body.iid);
        mysqlObject.query(getterQuery, function (error, results, fields) {
            if (error) {
                res.send(setMsgBody(errRes, error));
            } else {
                res.send(setMsgBody(defaultRes, results));
            }
        });

    });


    app.post('/update/inventory/item', (req, res) => {

        const getterQuery = 'UPDATE `inventory` SET `quantity`=' + req.body.quantity + ',`price`=' + req.body.price + ', `name`="' + req.body.name + '" WHERE `iid`='.concat(req.body.iid);
        // console.log('UPDATE TABLE `inventory` SET `quantity`=' + req.body.quantity + ',`price`=' + req.body.price + ', `name`=' + req.body.name + ' WHERE `iid`='.concat(req.body.iid));
        mysqlObject.query(getterQuery, function (error, results, fields) {
            if (error) {
                res.send(setMsgBody(errRes, error));
            } else {
                res.send(setMsgBody(defaultRes, results));
            }
        });

    });

    app.post('/delete/inventory', (req, res) => {

        const delQuery = 'DELETE FROM `inventory` WHERE `iid`='.concat(req.body.iid);
        mysqlObject.query(delQuery, function (error, results, fields) {
            if (error) {
                res.send(setMsgBody(errRes, error));
            } else {
                res.send(setMsgBody(defaultRes, results));
            }
        });

    });

    app.post('*', (req, res) => {
        res.send(defaultRes);
    });
    app.get('*', (req, res) => {
        res.send(defaultRes);
    });

}