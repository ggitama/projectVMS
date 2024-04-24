// parse = require('node-html-parser');

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./src/models/db");
const app = express();
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerSumDocument = require("./swagger.json");

dotenv.config();
global.__basedir = __dirname;
const https = require("https");

const fs = require("fs");
const key = "./cert/TRI_SSL_07-09_2023_Private_Key.txt";
const cert = fs.readFileSync("./cert/TRI_SSL_07-09_2023_CACert-Bundle.txt");
//const server = https.createServer({ key, cert }, app);

// const options = {
//   key: fs.readFileSync('./cert/TRI_SSL_07-09_2023_Private_Key.key'),
//   cert: fs.readFileSync('./cert/TRI_SSL_07-09_2023_CACert-Bundle.crt')
// };

// const server = https.createServer(options, app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api-docs-sum", swaggerUi.serve, swaggerUi.setup(swaggerSumDocument));

//DASHBOARD ROUTES
const ponew = require("./src/routes/dash_po_new.routes");
const ranew = require("./src/routes/dash_ra_new.routes");
const pORoute = require("./src/routes/po.routes");
const UserRoute = require("./src/routes/user.routes");
const supplierRoute = require("./src/routes/supplierDetail.routes");
const receivingAdviceResponseRoute = require("./src/routes/receivingAdviceResponse.routes");
const returRequestRoute = require("./src/routes/returRequest.routes");
const returConfirmationRoute = require("./src/routes/returConfirmation.routes");
const returRequestNotificationRoute = require("./src/routes/returRequestNotification.routes");
const proformaInvoiceResponseRoute = require("./src/routes/proformaInvoiceResponse.routes");
const invoiceRoute = require("./src/routes/invoice.routes");
const prdRoute = require("./src/routes/prd.routes");
const notaReturRoute = require("./src/routes/notaRetur.routes");
const creditNoteRoute = require("./src/routes/creditNote.routes");
const raRoute = require("./src/routes/ra.routes");
const pfiRoute = require("./src/routes/pfi.routes");
const searchRoute = require("./src/routes/search.routes");
const invdetailroute = require("./src/routes/invoiceDetails.routes");
const sRoute = require("./src/routes/supplier.routes");
const administration = require("./src/routes/adm.routes");
const rrrRoute = require("./src/routes/returRequestResponse.routes");
const consPfiRoute = require("./src/routes/consPfi.routes");
const consLitigasiRoute = require("./src/routes/consLitigasi.routes");
const consNotaReturRoute = require("./src/routes/consNotaRetur.routes");
const consSARoute = require("./src/routes/consSalesAnalysis.routes");
const consIRoute = require("./src/routes/consInvoice.routes");
const bpfrRoute = require("./src/routes/bpfr.routes");
const tkRoute = require("./src/routes/trfKwitansi.routes");
const efRoute = require("./src/routes/eFaktur.routes");
const admStoreRoute = require("./src/routes/adm_store.routes");
const admDepartmentRoute = require("./src/routes/adm_department.routes");
const admBusinessUnitRoute = require("./src/routes/adm_business_unit.routes");
const admIntUserRoute = require("./src/routes/adm_intuser.routes");
const admWarehouseRoute = require("./src/routes/adm_warehouse.routes");
const admArcdocRoute = require("./src/routes/adm_arcdoc.routes");
const documentRoute = require("./src/routes/document.routes");
const worksheetRoute = require("./src/routes/worksheet.routes");
const annoucmentRoute = require("./src/routes/adm_annoucement.routes");
const cmRoute = require("./src/routes/cm.routes");
const { TIMEOUT } = require("dns");
const { sum } = require("lodash");

//DASHBOARD ROUTES
app.use("/vmsdev/dashponew", ponew);
app.use("/vmsdev/dash", ranew);
app.use("/vmsdev/po", pORoute);
app.use("/vmsdev/user", UserRoute);
app.use("/vmsdev/supplier", supplierRoute);
app.use("/vmsdev/rr", returRequestRoute);
app.use("/vmsdev/rc", returConfirmationRoute);
app.use("/vmsdev/rrn", returRequestNotificationRoute);
app.use("/vmsdev/rar", receivingAdviceResponseRoute);
app.use("/vmsdev/pfir", proformaInvoiceResponseRoute);
app.use("/vmsdev/i", invoiceRoute);
app.use("/vmsdev/prd", prdRoute);
app.use("/vmsdev/nr", notaReturRoute);
app.use("/vmsdev/cn", creditNoteRoute);
app.use("/vmsdev/ra", raRoute);
app.use("/vmsdev/pfi", pfiRoute);
app.use("/vmsdev/search", searchRoute);
app.use("/vmsdev/inv", invdetailroute);
app.use("/vmsdev/s", sRoute);
app.use("/vmsdev/adm", administration);
app.use("/vmsdev/rrr", rrrRoute);
app.use("/vmsdev/cp", consPfiRoute);
app.use("/vmsdev/apl", consLitigasiRoute);
app.use("/vmsdev/nrc", consNotaReturRoute);
app.use("/vmsdev/sa", consSARoute);
app.use("/vmsdev/ci", consIRoute);
app.use("/vmsdev/bpfr", bpfrRoute);
app.use("/vmsdev/tk", tkRoute);
app.use("/vmsdev/ef", efRoute);
app.use("/vmsdev/adm", admStoreRoute);
app.use("/vmsdev/adm", admDepartmentRoute);
app.use("/vmsdev/adm", admBusinessUnitRoute);
app.use("/vmsdev/adm", admIntUserRoute);
app.use("/vmsdev/adm", admWarehouseRoute);
app.use("/vmsdev/adm", admArcdocRoute);
app.use("/vmsdev/doc", documentRoute);
app.use("/vmsdev/w", worksheetRoute);
app.use("/vmsdev/a", annoucmentRoute);
app.use("/vmsdev/cm", cmRoute);

app.use(express.static("upload"));

//COMMIT
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
    setTimeout(function () {
      console.log("500000ms timeout");
    }, 500000);
  });
});
