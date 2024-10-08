const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-2'
})
const sendEmailPath ='/sendemail';
var ses = new AWS.SES({region: 'us-east-2'})

exports.handler = async (event) => {
let response;
switch(true){
    case event.httpMethod === 'POST' && event.path === sendEmailPath :
        response
}
};