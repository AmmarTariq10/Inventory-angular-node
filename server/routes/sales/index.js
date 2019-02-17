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

    app.post('/get/sales', (req, res) => {

        mysqlObject.query('SELECT * FROM `sales` ORDER BY `sid` DESC', function (error, results, fields) {
            if (error) {
                res.send(setMsgBody(errRes, error));
            } else {
                res.send(setMsgBody(defaultRes, results));
            }
        });

    });

    app.post('/get/sales/receipt', (req, res) => {
        let receiptQuery = '';
        const sales = JSON.parse(req.body[0].receipt);
        const len = sales.length - 1;
        let it = 0;
        Object.keys(sales).forEach((k) => {
            receiptQuery = 'SELECT * FROM `inventory` WHERE `iid`='.concat(k);
            if (it < len) {
                receiptQuery.concat(' UNION ');
            }
            it++;
        });
        mysqlObject.query(receiptQuery, function (error, results, fields) {
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
                if (iterator == itemsLen) {
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
