const nodemailer = require('nodemailer');
const https = require('https');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '10.21.3.36',
  database: 'vmsdev',
  password: 'postgres',
  port: 5432, // Default PostgreSQL port
});

const selectQuery = 'select * From vms."email_ra_tolak"';



pool.query(selectQuery, (err, result) => {

  if(result.rows.length > 0){
    
const textemail = result.rows[0].textemail;
const purchaseorder = result.rows[0].purchase_order;
const order_qty = result.rows[0].order_qty; 
const received_qty = result.rows[0].received_qty;
const code = result.rows[0].code;
const nama_supp = result.rows[0].nama_supp;
const primary_email = result.rows[0].primary_email;

    // MAIL SETTING
//$host = '10.153.192.170'
$host = 'mail.trid-corp.net';
$port = '587';
$user = 'no_reply';
$pass = 'vPCnqiNnaA1';

//$pass = 'vPCnqiNnaA1';

// Create a transporter object using your email service credentials
const transporter = nodemailer.createTransport({
  service: 'SMTP', // e.g., 'Gmail' or 'SMTP'
  auth: {
    user: $user,
    pass: $pass
  },
  host : $host,
  port : $port,
  tls: {
    rejectUnauthorized: false
  },
  agent: new https.Agent({
    rejectUnauthorized: false
  })

});

// Define the email content
const mailOptions = {   
  from: 'no_reply@transretail.co.id',
  to: 'salman_afarisyi@transretail.co.id;saf4291@gmail.com',
  cc: 'ykwyudha@gmail.com',
  subject: 'VMS RA '+purchaseorder +' - DITOLAK ',
  //text: 'Receiving Advice dengan nomor order TRI1501303462434 telah di tolak, mohon periska kembali Quantity anda.',
  html: textemail
  // text: textemail
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    if(info.response =='250 Mail queued for delivery'){ 

        const pool2 = new Pool({
            user: 'postgres',
            host: '10.21.3.36',
            database: 'vmsdev',
            password: 'postgres',
            port: 5432, // Default PostgreSQL port
          });
        const insertquery = `insert into vms."log_email_ra_tolak" 
        values ('${purchaseorder}','${order_qty}','${received_qty}','${code}','${nama_supp}','${primary_email}', '${textemail}');`
        console.log(insertquery);
        pool2.query(insertquery, (err, resulti) => {
            if(err){
                console.log(err);
            }else{
                "berhasil insert nih";
            }

        });
        return;
        

    }else{
        console.log("gagal euy");
    }
    console.log('Email sent:', info.response);
  }
}
);
   

  }else{
    console.log("=========================")
    console.log("DATANYA GAK ADA")
    console.log("=========================")
  }

});

//console.log(result.rows[0]);

pool.end();