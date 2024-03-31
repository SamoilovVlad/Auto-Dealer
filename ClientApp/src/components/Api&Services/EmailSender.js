import emailjs from 'emailjs-com';

const EmailSender = {
    init() {
        emailjs.init("ezRy9-VIO4IKj1o3d");
    },

    SendEmail(message, name, phone='', email) {
        this.init();
        const serviceId = "service_vxc3bh6";
        const templateId = "template_36x3kb8";

        var params = {
            sendername: name,
            to: "noreplynovus547@gmail.com",
            subject: 'User Question',
            replyto: "noreplynovus547@gmail.com",
            message: `${message} \n\nPhone number - ${phone} \n\n Email - ${email}`,
            from_name: name,
        };

        emailjs.send(serviceId, templateId, params)
            .then(() => {
                alert("Email Sent Successfully!");
            })
            .catch(error => {
                console.error("Email sending failed:", error);
            });
    }
};

export default EmailSender;
