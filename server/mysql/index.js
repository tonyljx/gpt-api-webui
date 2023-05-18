const mysql = require('mysql');


function getConntection() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'gpt',
        password: 'woyaozhuanqian123!',
        database: 'gpt'
    });
    return connection;
}

// 异步函数 这样不能返回值
function get_userid_by_account(username){
    const connection = getConntection();

    let result = -1;
    connection.connect();

    connection.query({
        sql: 'SELECT * FROM `account` WHERE `name` = ?',
        timeout: 40000, // 40s
        values: [username]
    }, function (error, results, fields) {
        console.log(results);
        if(results.length > 0 ){
            console.log("username: "+username+": "+"id: "+results[0].id);
            result =  results[0].id;
        }else{
            return -1;
        }
    });
    connection.end();
    return result;
}

function get_userid_by_account_promise(username) {
    const connection = getConntection();

    return new Promise((resolve, reject) => {
        connection.connect();

        connection.query({
            sql: 'SELECT * FROM `account` WHERE `name` = ? ',
            timeout: 40000, // 40s
            values: [username],
        }, function (error, results, fields) {
            if (error) {
                reject(error);
                return;
            }
            console.log(results);
            if (results.length > 0) {
                console.log("username: " + username + ": " + "id: " + results[0].id);
                resolve(results[0].id);
            } else {
                resolve(-1);
            }
        });
        connection.end();
    });
}


function get_quota_by_account(username){
    const connection = getConntection();
    let id = -1;
    let quota = 1;

    get_userid_by_account_promise(username)
        .then((result)=>{
            if(result === -1){
                console.log("Not found in quota table!");
                return;
            }
            connection.connect();
            connection.query({
                sql: 'SELECT * FROM `quota` WHERE `id` = ?',
                timeout: 40000, // 40s
                values: [result]
            }, function (error, results, fields) {
                console.log(results);
                if(results.length > 0 ){
                    id = results[0].id;
                    console.log(id+": "+results[0].count);
                    quota =  results[0].quota;
                    return quota;
                }
            });
            connection.end();
        })
        .catch((error)=>{
            console.error(error);
        })
}

module.exports={
    get_userid_by_account,
    get_quota_by_account,
    getConntection
}

