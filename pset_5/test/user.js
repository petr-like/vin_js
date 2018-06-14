// user.js
let mongoose = require("mongoose");
let Controller = require('../controllers/Controller');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Delete DB', () => {
		beforeEach((done) => { //Before each test we empty the database
				console.log('beforeEach');
				Controller.delete({}, (err) => {
					Controller.deleteCheckin({}, (err) => {
						done();
					});
				});
				
		});

/*
* Test the /GET route
*/
	describe('/GET user', () => {
			it('test', (done) =>{
				(1).should.be.eql(1);
				done();
			});
			it('it should GET all the users', (done) => {
				console.log('request');
				chai.request(server)
						.get('/api/all_users')
						.end((err, res) => {
								console.log('resault');
								res.should.have.status(200);
								res.body.should.be.a('array');
								res.body.length.should.be.eql(0);
							done();
						});
			});
	});
	describe('/GET users when exist', () => {
		beforeEach((done) => { //Before each test we empty the database
			console.log('beforeEach_created');
			var data ={
				name: 'test',
				last_name: 'test2',
				username: 'test1',
				password: '123'
			};
			Controller.create(data, (err, user) =>{
				if(err) {
					console.log(err)
				}else{
					done()
				}
			})
		});
		it('it should GET all the users', (done) => {
			chai.request(server)
				.get('/api/all_users')
				.end((err, res) => {
						console.log('resault');
						res.should.have.status(200);
						res.body.should.be.a('array');
						res.body.length.should.be.eql(1);
						res.body[0].name.should.be.eql('test');
						res.body[0].last_name.should.be.eql('test2');
						res.body[0].username.should.be.eql('test1');
						res.body[0].password.should.be.eql('123');
						res.body[0].token.should.be.eql('');
					done();
				});
		});
	});
	describe('/Post checkin', () => {
		beforeEach((done) => { //Before each test we empty the database
			var data = {
				user: '123',
				title: 'Title_test',
				description: 'Test_desc',
				rating: '5',
				cord: {
					lat: 49.33,
					lng: 24.22
				}
			}
			Controller.createCheckin(data, (err, checkin) =>{
				if(err) {
					console.log(err)
				}else{
					done()
				}
			})
		})
		it('it should GET all the checkin', (done) => {
			chai.request(server)
			.get('/api/all_checkins')
			.end((err, res) => {
					console.log('resault');
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(1);
					res.body[0].user.should.be.eql('123');
					res.body[0].title.should.be.eql('Title_test');
					res.body[0].description.should.be.eql('Test_desc');
					res.body[0].rating.should.be.eql(5);
					res.body[0].cord.should.be.eql({lat: 49.33, lng: 24.22});
				done();
			});
		});
	});
});