const JasperReports = require('./jasper-reports-server');

exports.generateReport = (requestType) => {
    switch (requestType) {
        case 'FIRST_REPORT':
            JasperReports.getReport();
            // generateReportOutput();
            // logout();
            break;
        case 'DYNAMIC_REPORT':
            JasperReports.getDynamicReport().then((data) => {
                return data;
            }).catch((e) => {
                console.log('Error getting the report');
            })
            // generateReportOutput();
            // logout();
            break;
        default:
            break;
      }
}