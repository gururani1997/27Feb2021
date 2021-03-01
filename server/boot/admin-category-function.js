'use strict';
var lowerCase = require('lower-case');
var trim = require('trim');
var dateFormat = require('dateformat');
var multiparty = require('multiparty');
var fs = require('fs');
var Async = require('async');

var Moment = require('moment');
var momentTimeZ = require('moment-timezone');

module.exports = function (app) {
    var category = app.models.category;

    app.get('/admin/category/listing', (req, res) => {

        var data = {};
        data.error = req.flash("error");
        data.success = req.flash("success");
        data.session = req.session;
        data.dateFormat = dateFormat;
        data.tableTitle = "category";
        var statusByStatus = ['active', 'inactive'];
        console.log("product details")
        category.find({
            where: { status: "active" },
            order: "created_date desc"
        }, (err, result) => {
            console.log("error find",err)
            if (err) {
                data.result = [];
                req.flash('error', 'Something went wrong.');
                res.redirect(req.get('Referrer'));
            }
            else {
                data.result = result;
                res.render('category/listing', data);
            }
        });
    });
    app.get('/admin/category/add', function (req, res) {
        var data = {};
        data.error = req.flash("error");
        data.success = req.flash("success");
        // data.session = req.session;
        data.tableTitle = "category";
        data.tableTitleSingular = "category";
        res.render('category/add', data);
    });
    app.post('/admin/category/add', (req, res) => {
      

        var data = {};
        data.error = req.flash("error");
        data.success = req.flash("success");
        // data.session = req.session;
            
        var dataArray = {
            "name":req.body.name,
            "type": req.body.type,
        };

        category.create(dataArray, async function (err, user) {
            if (err) {
                req.flash('error', err);
                res.redirect(req.get('Referrer'));
                return;
            }else{
                req.flash('success', 'New category is added successfully.');
                res.redirect('/admin/category/listing')
            }
        })
    });
    app.get('/admin/category/edit/:id', function (req, res) {
        var data = {};
        data.error = req.flash('error');
        data.success = req.flash('success');
        data.session = req.session;
        data.tableTitle = 'category';
        data.tableTitleSingular = 'category';
        if (!req.params.id) {
            req.flash('error', 'Sorry id parameter is missing.');
            res.redirect('product/listing');
        }
        category.findOne({ 'where': { 'id': req.params.id } }, function (err, result) {
            if (err) {
                data.result = [];
                res.render('category/edit', data);
            } else {
                data.result = result;
                res.render('category/edit', data);
            }
        });
    });
    app.post('/admin/category/updateUser', function (req, res) {
        var data = {};
        data.error = req.flash('error');
        data.success = req.flash('success');
        data.session = req.session;
        data.tableTitle = 'category';
        data.tableTitleSingular = 'category';
        console.log(req.body)
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            console.log(fields)
            req.body.name = fields.name[0];
            req.body.type = fields.type[0];
            let id = fields.id[0];
            category.findById(id, function (err, user) {
                if (err || !user) {
                    console.log(err);
                    req.flash('error', 'Sorry something went wrong.');
                    res.redirect(req.get('Referrer'));
                } else {
                    user = Object.assign(user, req.body);
                    user.save(function (err, saved) {
                        category.find({
                            where: {
                                "isdeleted": false
                            }
                        },(err,ress)=>{
                            if(err){
                                req.flash('error', 'Sorry something went wrong.');
                                res.redirect(req.get('Referrer'));
                            }
                            else{
                                data.result=ress;
                                req.flash('success', 'Successfully updated your profile.');
                                res.render('category/listing', data);

                            }


                        })
                    });
                }
            });

        });
    });
    app.get('/admin/category/status/:status/:id', function (req, res) {
        console.log("on post request of status with id", req.params.id)
        var data = {};
        data.error = req.flash('error');
        data.success = req.flash('success');
        data.session = req.session;
        data.tableTitle = 'category';
        data.tableTitleSingular = 'category';
        var status = req.params.status;

        req.body = [];
        if (status == 'active') {
            req.body.status = 'active';
        } else if (status == 'inactive') {
            req.body.status = 'inactive';
        } else {
            req.body.status = 'delete';
            // req.body.deletedAt = CurrentTimeStamp;
        }
        // req.body.updated_date = CurrentTimeStamp;

        category.findById(req.params.id, function (err, user) {
            if (err || !user) {
                req.flash('error', 'Sorry something went wrong.');
                res.redirect(req.get('Referrer'));
            } else {
                let status = req.body.status;
                // product = Object.assign(product, req.body);
                // req.app.models.product.save(function (err, saved) {
                category.update({ id: req.params.id }, { status: req.body.status }, (err, result) => {
                    if (err) {
                        req.flash('error', 'unable to delete this product.');
                    }
                    else {
                        data.result = result;
                        req.flash('success', 'Successfully deleted this product.')

                    }
                    res.redirect(req.get('Referrer'));
                });
            }
        });
    });
}