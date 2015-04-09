var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '43416244@qq.com',
        pass: 'fuckWeiyinizhi2'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Fred Foo ✔ <43416244@qq.com>', // sender address
    to: 'huayun321@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

function send(to, password, callback) {
    var mailOptions = {
        from: 'Fred Foo ✔ <43416244@qq.com>', // sender address
        to: to, // list of receivers
        subject: '你在918diy.com的密码 ✔', // Subject line
        text: '密码是： ' + password // plaintext body

    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            callback(error, null);
        }else{
            callback(null, 'Message sent: ' + info.response)
        }
    });
}

module.exports.send = send;