// function to send response
const respond = (request, response, content, status, type) => {
  // set status code (200 success) and content type
  response.writeHead(status, { 'Content-Type': type });
  // write the content string or buffer to response
  response.write(content);
  // send the response to the client
  response.end();
};


const success = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'Success'
  };

  console.log(acceptedTypes[0]);

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 200, 'text/xml');
  }

  const jsonString = JSON.stringify(responseJSON);

  return respond(request, response, jsonString, 200, 'application/json');
};

const badRequest = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'Bad Request'
  };


  if (!params.valid || params.valid !== 'true') {

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, responseXML, 400, 'text/xml');
    }

    const jsonString = JSON.stringify(responseJSON);

    return respond(request, response, jsonString, 400, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 400, 'text/xml');
  }

  const jsonString = JSON.stringify(responseJSON);

  // send our json with a success status code
  return respond(request, response, jsonString, 200, 'application/json');
};

// function to show a bad request without the correct parameters
const unauthorized = (request, response, params, acceptedTypes) => {
  // message to send
  const responseJSON = {
    message: 'You have successfully viewed the content.',
    id: 'Unauthorized'
  };

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {

    // if the client's most preferred type (first option listed)
    // is xml, then respond xml instead
    if (acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      // return response passing out string and content type
      return respond(request, response, responseXML, 401, 'text/xml');
    }
    const jsonString = JSON.stringify(responseJSON);

    // return our json with a 400 bad request code
    return respond(request, response, jsonString, 401, 'application/json');
  }

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, responseXML, 401, 'text/xml');
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const jsonString = JSON.stringify(responseJSON);

  // if the parameter is here, send json with a success status code
  return respond(request, response, jsonString, 200, 'application/json');
};

const forbidden = (request, response, params, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 403, 'text/xml');
  }

  const jsonString = JSON.stringify(responseJSON);

  return respond(request, response, jsonString, 403, 'application/json');
};

const internal = (request, response, params, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internal',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 500, 'text/xml');
  }

  const jsonString = JSON.stringify(responseJSON);

  return respond(request, response, jsonString, 500, 'application/json');
};

const notImplemented = (request, response, params, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 501, 'text/xml');
  }

  const jsonString = JSON.stringify(responseJSON);

  return respond(request, response, jsonString, 501, 'application/json');
};

// function to show not found error
const notFound = (request, response, params, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 404, 'text/xml');
  }

  const jsonString = JSON.stringify(responseJSON);

  return respond(request, response, jsonString, 404, 'application/json');
};

// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
