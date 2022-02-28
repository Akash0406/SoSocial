const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment) => {
    // console.log("Inside newComment mailer", comment);

    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');
    // console.log(htmlString);


    nodeMailer.transporter.sendMail({
        from: 'starx.897@gmail.com',
        to: comment.user.email,
        subject: "New Comment Publish!",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }
        // console.log('Mail sent', info);
        return;
    });
}