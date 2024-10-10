import aws from 'aws-sdk';

aws.config.update({ region: 'us-east-1' });

const senderEmail = 'ahmed.fakher.e@gmail.com'; // Replace with your dedicated email

const ses = new aws.SES({ region: 'us-east-1' });

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return responseReturn(404, 'Uh Oh');
  }

  try {
    const requestBody = JSON.parse(event.body);
    const response = await sendEmail(requestBody);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    return responseReturn(500, 'Internal server error');
  }
};

async function sendEmail({ name, email, message }) {
  const params = {
    Destination: { ToAddresses: ["ezzeldin.mo3@gmail.com"] }, 
    Message: {
      Body: {
        Text: {
          Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        },
      },
      Subject: { Data: "From Site" },
    },
    Source: senderEmail,
  };

  try {
    const data = await ses.sendEmail(params).promise();
    return responseReturn(200, data);
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.code === 'ValidationError') {
      return responseReturn(400, 'Invalid email format');
    } else {
      return responseReturn(500, 'Internal server error');
    }
  }
}

function responseReturn(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
