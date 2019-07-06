// https://community.jaspersoft.com/documentation/jasperreports-server-web-service-guide-v500   3.2.1
// https://stackoverflow.com/questions/9538038/jasper-rest-api-run-a-report

const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '../../.env.jasperreports' });
const axios = require('axios');

let cookie;
let exportId;
let requestId;

getReporte1 = (req, response) => {
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            'username': 'jasperadmin',
            'password': 'jasperadmin'
        },
        responseType: 'document',
        withCredentials: true
    }
    

    axios.get('http://localhost:8080/jasperserver/rest_v2/reports/reports/MinerUCAB/Reporte1.html', config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);
            const link = path.join(__dirname, '../outputs/Reporte1.html')

            fs.writeFile(path.join(__dirname, '../outputs/Reporte1.html'), (res.data), (err) => {
                if (err){
                    logout()
                    throw err;
                }
                else{
                    console.log('The file has been saved!');
                    response.status(200).json({link: res.data})
                }
                logout()
            });
            
            logout()

            // console.log(res)
        }).catch((e) => {
            console.log('Error')
            response.status(500)
        })
}

exports.getDynamicReport = () => {
    
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            'username': 'jasperadmin',
            'password': 'jasperadmin'
        },
        responseType: 'document',
        withCredentials: true
    }
    

    axios.get('http://localhost:8080/jasperserver/rest_v2/reports/reports/Test/DynamicQuery.html?id=1', config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);

            fs.writeFile(path.join(__dirname, '../outputs/Dynamic_Report.html'), (res.data), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
            
            logout();
            // console.log(res)
        }).catch((e) => {
            console.log('Error en axios')
        })
}

exports.getReport = () => {
    // const data = {
    //     "reportUnitUri" : "/reports/Test/First_Report",
    //     "async" : false,
    //     "freshData" : true,
    //     "saveDataSnapshot" : false,
    //     "outputFormat" : "html",
    //     "interactive" : true,
    //     "ignorePagination" : true
    // }
    
    // const config = {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     auth: {
    //       'username': 'jasperadmin',
    //       'password': 'jasperadmin'
    //     },
    //     responseType: 'document',
    //     withCredentials: true
    // }

    // const data = {
    //     'j_username': 'jasperadmin',
    //     'j_password': 'jasperadmin',
    // }
    
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            'username': 'jasperadmin',
            'password': 'jasperadmin'
        },
        responseType: 'document',
        withCredentials: true
    }
    

    axios.get('http://localhost:8080/jasperserver/rest_v2/reports/reports/Test/First_Report.html', config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);

            fs.writeFile(path.join(__dirname, '../outputs/First_Report.html'), (res.data), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
            
            logout()
            // console.log(res)
        }).catch((e) => {
            console.log('Error')
        })
    
    // axios.post('http://localhost:8080/jasperserver/rest_v2/reportExecutions', data, config)
    //     .then((res) => {
    //         console.log(res);
    //         console.log('Estatus');
    //         console.log(res.status);
    //         console.log('res.data.requestId');
    //         requestId = res.data.requestId;
    //         console.log(requestId);
    //         console.log('res.data.exports');
    //         console.log(res.data.exports[0]);
    //         console.log('res.data.exports.id');
    //         exportId = res.data.exports[0].id
    //         console.log(exportId);
    //         console.log('CookiePath')
            // cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            // console.log(cookie);
            // cookie = `$Version=0; ${cookie.join(' ')}`;
            // console.log(cookie);
            

        

    //         getReportOutput();
    //         // logout()

    //     })
    //     .catch((e) => {
    //         console.log(e)
    //     });
}

const getReportOutput = () => {
    const config = {
        responseType: 'document',
        withCredentials: true
    }

    // http://<host>:<port>/jasperserver[-pro]/rest_v2/reportExecutions/requestID/exports/exportID/attachments/fileName
    axios.get(`http://localhost:8080/jasperserver/rest_v2/reportExecutions/${requestId}/exports/${exportId}/outputResource`, config)
        .then((res) => {
            console.log('res');
            // logout()
        }).catch((e) => {
            // console.log(e)
            console.log('logout')
            logout()
        })
}

const logout = () => {
    const config = {
        Cookie: cookie
    }

    axios.get('http://localhost:8080/jasperserver//logout.html', config)
        .then((res) => {
            console.log('logout', res)
        }).catch((e) => {
            console.log('error loging out')
        })
}

module.exports = {
    getReporte1
}