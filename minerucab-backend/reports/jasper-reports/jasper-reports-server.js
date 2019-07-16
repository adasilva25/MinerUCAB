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
    const fecha_inicio = req.params.fecha_inicio
    const fecha_fin = req.params.fecha_fin

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
    

    axios.get(`http://localhost:8080/jasperserver/rest_v2/reports/reports/MinerUCAB/Reporte1.html?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`, config)
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

getReporte2 = (req, response) => {
    const fecha_inicio = req.params.fecha_inicio
    const fecha_fin = req.params.fecha_fin
    
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
    

    axios.get(`http://localhost:8080/jasperserver/rest_v2/reports/reports/MinerUCAB/Reporte2.html?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`, config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);
            const link = path.join(__dirname, '../outputs/Reporte2.html')

            fs.writeFile(path.join(__dirname, '../outputs/Reporte2.html'), (res.data), (err) => {
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
            console.log('Error', e)
            response.status(500)
        })
}

getReporte3 = (req, response) => {
    const fecha_inicio = req.params.fecha_inicio
    const fecha_fin = req.params.fecha_fin
    
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
    

    axios.get(`http://localhost:8080/jasperserver/rest_v2/reports/reports/MinerUCAB/Reporte3.html?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`, config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);
            const link = path.join(__dirname, '../outputs/Reporte3.html')

            fs.writeFile(path.join(__dirname, '../outputs/Reporte3.html'), (res.data), (err) => {
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
            console.log('Error', e)
            response.status(500)
        })
}

getReporte4 = (req, response) => {
    const fecha_inicio = req.params.fecha_inicio
    const fecha_fin = req.params.fecha_fin
    
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
    

    axios.get(`http://localhost:8080/jasperserver/rest_v2/reports/reports/MinerUCAB/Reporte4.html?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`, config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);
            const link = path.join(__dirname, '../outputs/Reporte4.html')

            fs.writeFile(path.join(__dirname, '../outputs/Reporte4.html'), (res.data), (err) => {
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
            console.log('Error', e)
            response.status(500)
        })
}

getReporte5 = (req, response) => {
    const fecha_inicio = req.params.fecha_inicio
    const fecha_fin = req.params.fecha_fin
    
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
    

    axios.get(`http://localhost:8080/jasperserver/rest_v2/reports/reports/MinerUCAB/Reporte5.html?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`, config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);
            const link = path.join(__dirname, '../outputs/Reporte5.html')

            fs.writeFile(path.join(__dirname, '../outputs/Reporte5.html'), (res.data), (err) => {
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
            console.log('Error', e)
            response.status(500)
        })
}

getReporte6 = (req, response) => {
    const fecha_inicio = req.params.fecha_inicio
    const fecha_fin = req.params.fecha_fin
    
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
    

    axios.get(`http://localhost:8080/jasperserver/rest_v2/reports/reports/MinerUCAB/Reporte6.html?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`, config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);
            const link = path.join(__dirname, '../outputs/Reporte6.html')

            fs.writeFile(path.join(__dirname, '../outputs/Reporte6.html'), (res.data), (err) => {
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
            console.log('Error', e)
            response.status(500)
        })
}

getReporte7 = (req, response) => {
    const fecha_inicio = req.params.fecha_inicio
    const fecha_fin = req.params.fecha_fin
    const ci = req.params.ci
    
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
    

    axios.get(`http://localhost:8080/jasperserver/rest_v2/reports/reports/MinerUCAB/Reporte7.html?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&ci=${ci}`, config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);
            const link = path.join(__dirname, '../outputs/Reporte7.html')

            fs.writeFile(path.join(__dirname, '../outputs/Reporte7.html'), (res.data), (err) => {
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
            console.log('Error', e)
            response.status(500)
        })
}

getReporte8 = (req, response) => {
    const fecha_inicio = req.params.fecha_inicio
    const fecha_fin = req.params.fecha_fin

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
    

    axios.get(`http://localhost:8080/jasperserver/rest_v2/reports/reports/MinerUCAB/Reporte8.html?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`, config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);
            const link = path.join(__dirname, '../outputs/Reporte8.html')

            fs.writeFile(path.join(__dirname, '../outputs/Reporte8.html'), (res.data), (err) => {
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

getReporte9 = (req, response) => {
    const fecha_inicio = req.params.fecha_inicio
    const fecha_fin = req.params.fecha_fin
    
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
    

    axios.get(`http://localhost:8080/jasperserver/rest_v2/reports/reports/MinerUCAB/Reporte9.html?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`, config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);
            const link = path.join(__dirname, '../outputs/Reporte9.html')

            fs.writeFile(path.join(__dirname, '../outputs/Reporte9.html'), (res.data), (err) => {
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
            console.log('Error', e)
            response.status(500)
        })
}

getReporte10 = (req, response) => {
    const fecha_inicio = req.params.fecha_inicio
    const fecha_fin = req.params.fecha_fin
    
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
    

    axios.get(`http://localhost:8080/jasperserver/rest_v2/reports/reports/MinerUCAB/Reporte10.html?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`, config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);
            const link = path.join(__dirname, '../outputs/Reporte10.html')

            fs.writeFile(path.join(__dirname, '../outputs/Reporte10.html'), (res.data), (err) => {
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
            console.log('Error', e)
            response.status(500)
        })
}

reportePrueba = (req, response) => {
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
    

    axios.get('http://localhost:8080/jasperserver/rest_v2/reports/reports/Test/Empleados.pdf', config)
        .then((res) => {
            cookie = res.headers["set-cookie"][0].split(' ').splice(0, 2);
            console.log(cookie);
            cookie = `$Version=0; ${cookie.join(' ')}`;
            console.log(cookie);
            const link = path.join(__dirname, '../outputs/Empleados.pdf')

            fs.writeFile(path.join(__dirname, '../outputs/Empleados.pdf'), (res.data), (err) => {
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
    getReporte1,
    getReporte2,
    getReporte3,
    getReporte4,
    getReporte5,
    getReporte6,
    getReporte7,
    getReporte8,
    getReporte9,
    getReporte10,
    reportePrueba
}