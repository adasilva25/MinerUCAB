const JasperReports = require('./jasper-reports-server');

exports.generateReport = (requestType) => {
    switch (requestType) {
        case 'FIRST_REPORT':
            JasperReports.getReport();
            // generateReportOutput();
            // logout();
            break;
        default:
            break;
      }
}