module.exports = function (app) {
  var remotes = app.remotes();

   remotes.after('**', function (ctx, next) {
    //   var data = {
    // 	  status: "success",
    //     message: "Successfully.",
    // 	  data: ctx.result
    //   }; 
    //   ctx.result = data;
    //   next();

      ctx.result = {
        status: 200,
        statusMsg: "success",
        message: "Successfully.",
        data: ctx.result
      };
      next();
  });
};