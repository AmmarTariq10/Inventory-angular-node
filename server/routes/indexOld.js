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
        user: 'haider',
        password: 'Ahmed1234.!',
        database: 'invsales'
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

        mysqlObject.query('INSERT INTO `inventory` (`name`,`quantity`,`price`) VALUES ("' + req.body.name+ '", ' + req.body.quantity + ', ' + req.body.price + ')', function (error, results, fields) {
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


    app.post('/get/sales', (req, res) => {

        mysqlObject.query('SELECT * FROM `sales`', function (error, results, fields) {
            if (error) {
                res.send(setMsgBody(errRes, error));
            } else {
                res.send(setMsgBody(defaultRes, results));
            }
        });

    });

    app.post('/add/sales', (req, res) => {
        
        const receipt = req.body.receipt;
        const saleQUery = 'INSERT INTO `sales` (`receipt`,`total`,`time`) VALUES (\'' + JSON.stringify(receipt) + '\',' + req.body.total + ', CURRENT_TIMESTAMP)';
        let iterator = 0;
        const itemsLen = Object.keys(receipt).length;
        Object.keys(receipt).forEach(k => {
            const newStock = parseInt(receipt[k].stock) - parseInt(receipt[k].quantity);
            mysqlObject.query('UPDATE INVENTORY SET `quantity`=' + newStock + ' WHERE `iid`=' + k, function (error, results, fields) {
                if (error) {
                    res.send(setMsgBody(errRes, error));
                } else {
                    iterator++;
                }
                if(iterator == itemsLen) {
                    mysqlObject.query(saleQUery, function (error, results, fields) {
                        if (error) {
                            res.send(setMsgBody(errRes, error));
                        } else {
                            res.send(setMsgBody(defaultRes, results));
                        }
                    });
                }
            });
        });

    });

}