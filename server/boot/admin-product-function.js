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
    var product = app.models.product;
    var category = app.models.category;

    app.get('/admin/product/listing', (req, res) => {

        var data = {};
        data.error = req.flash("error");
        data.success = req.flash("success");
        data.session = req.session;
        data.dateFormat = dateFormat;
        data.tableTitle = "product";
        data.categoryName;
        data.categoryId;
        data.result;
        var statusByStatus = ['active', 'inactive'];
        product.find({
            where: {
                "status": "active"
            }
        },
            (err, result) => {
                if (err) {
                    data.result = [];
                    req.flash('error', 'Something went wrong.');
                    res.redirect(req.get('Referrer'));
                }
                else {
                    // let tempCat = result[i].__data.categoryId;
                    data.result = result;
                    // category.findOne({ where: { id: tempCat } },
                    // ).then(ress => {
                    //     data.categoryName = ress.__data.name;
                    //     data.categoryId = ress.__data.id;
                    //     // console.log("this is the category name",data)
                    // }).catch(err => {
                    // console.log(err);
                    // })
                    res.render('product/listing', data);
                }
                // res.send({resc:200,resm:"success",data})



            });
    });

    app.get('/admin/product/add', function (req, res) {
        var data = {};
        data.error = req.flash("error");
        data.success = req.flash("success");
        // data.session = req.session;
        data.tableTitle = "product";
        data.tableTitleSingular = "product";
        category.find({
            isdeleted: false
        }, function (err, result) {
            if (err) {
                console.log("error", err)
                data.result = [];
                res.render('product/add', data);

            }
            else {
                console.log("result", result[0].__data.name)
                data.result = result;
                console.log("value", data.result[0].__data.name)
                res.render('product/add', data);

            }

        })
    });
    app.post('/admin/product/add', (req, res) => {
        var data = {};
        data.error = req.flash("error");
        data.success = req.flash("success");
        let categoryId;
        let category;
        // data.session = req.session;
        console.log("category", req.body.category)
        let tempCategory = req.body.category.split(",");
        req.body.category = tempCategory.map((val) => Number(val));
        categoryId = tempCategory[0];
        category = tempCategory[1];
        // console.log("this is the splited data",categoryId)
        console.log("this is the splited name", category)

        var dataArray = {
            "name": req.body.name,
            "details": req.body.details,
            "categoryId": categoryId,
            "categoryName": category,
        };

        product.create(dataArray, async function (err, user) {
            if (err) {
                req.flash('error', err);
                res.redirect(req.get('Referrer'));
                return;
            } else {
                req.flash('success', 'New product is added successfully.');
                res.redirect('/admin/product/listing')
            }
        })
    });
    app.get('/admin/product/categoryList', function (req, res) {
        var data = {};
        data.error = req.flash("error");
        data.success = req.flash("success");
        // data.session = req.session;
        data.tableTitle = "product";
        data.tableTitleSingular = "product";
        category.find({
            where: {
                "isdeleted": false
            }
        }, (err, user) => {
            if (err) {
                req.flash('error', err);
                res.redirect(req.get('Referrer'));
                return;
            }
            else {
                data.result = user;
                res.render('product/add', data);
            }
        })
    });
    app.get('/admin/product/status/:status/:id', function (req, res) {
        console.log("on post request of status with id", req.params.id)
        var data = {};
        data.error = req.flash('error');
        data.success = req.flash('success');
        data.session = req.session;
        data.tableTitle = 'product';
        data.tableTitleSingular = 'product';
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

        product.findById(req.params.id, function (err, user) {
            if (err || !user) {
                req.flash('error', 'Sorry something went wrong.');
                res.redirect(req.get('Referrer'));
            } else {
                let status = req.body.status;
                // product = Object.assign(product, req.body);
                // req.app.models.product.save(function (err, saved) {
                product.update({ id: req.params.id }, { status: req.body.status }, (err, result) => {
                    if (err) {
                        req.flash('error', 'unable to delete this product.');
                    }
                    else {
                        console.log("delet here")
                        data.result = result;
                        req.flash('success', 'Successfully deleted this product.')

                    }
                    res.redirect(req.get('Referrer'));
                });
            }
        });
    });
    app.get('/admin/product/edit/:id', function (req, res) {
        var data = {};
        data.error = req.flash('error');
        data.success = req.flash('success');
        data.session = req.session;
        data.tableTitle = 'product';
        data.tableTitleSingular = 'product';
        if (!req.params.id) {
            req.flash('error', 'Sorry id parameter is missing.');
            res.redirect('product/listing');
        }
        product.findOne({ 'where': { 'id': req.params.id } }, function (err, result) {
            if (err) {
                data.result = [];
                res.render('product/edit', data);
            } else {
                data.result = result;
                res.render('product/edit', data);
            }
        });
    });
    app.post('/admin/product/updateUser', function (req, res) {
        console.log("req.body",req.body)
        var data = {};
        data.error = req.flash('error');
        data.success = req.flash('success');
        data.session = req.session;
        data.tableTitle = 'product';
        data.tableTitleSingular = 'product';
        console.log(req.body)
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            console.log(fields)
            req.body.name = fields.name[0];
            req.body.details = fields.details[0];
            let id = fields.id[0];
            product.findById(id, function (err, user) {
                if (err || !user) {
                    console.log(err);
                    req.flash('error', 'Sorry something went wrong.');
                    res.redirect(req.get('Referrer'));
                } else {
                    user = Object.assign(user, req.body);
                    user.save(function (err, saved) {
                        product.find({
                            where: {
                                "status": "active"
                            }
                        },(err,ress)=>{
                            if(err){
                                req.flash('error', 'Sorry something went wrong.');
                                res.redirect(req.get('Referrer'));
                            }
                            else{
                                data.result=ress;
                                req.flash('success', 'Successfully updated your profile.');
                                res.render('product/listing', data);

                            }


                        })
                    });
                }
            });

        });
    });
}