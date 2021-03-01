module.exports = function (app) {
  var remotes = app.remotes();

  remotes.options.rest = remotes.options.rest || {}
  remotes.options.rest.handleErrors = false;

  app.middleware('final', FinalErrorHandler);

  function FinalErrorHandler(err, req, res, next) {
	var data = {
      status: 400,
      statusMsg: "error",
      message: err.message,
      data: {}
    };    
    res.status(400).send(data).end();
  }
};