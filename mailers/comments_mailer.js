const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment) => {
    console.log("Inside newComment mailer", comment);

    nodeMailer.transporter.sendMail({
        from: 'starx.897@gmail.com',
        to: comment.user.email,
        subject: "New Comment Publish!",
        html: '<h1> Your New Comment is Published </h1>'
    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            console.log(info);
            return;
        }

        console.log('Mail sent', info);
        return;
    });
}