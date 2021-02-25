/* eslint-disable prefer-destructuring */
const express = require('express');
const router = express.Router();
const fs = require('fs');

module.exports = (app, db) => {
	router.get('/', async (req, res) => {
		res.render('index', {});
	});

	router.get('/magiya-utra-skachat', async (req, res) => {
		res.render('books', {});
	});

	router.get('/participants', async (req, res) => {
		let currDate = new Date();
		let dates = []
		
		for (let i = 0; i < 5; i++) {
			currDate.setDate(currDate.getDate() - 1);
			dates.push(`${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()}`)
		}

		dates.reverse();

		let data = await fs.readFileSync(__dirname + '/../public/uploads/botFile.json', 'utf8');
		data = JSON.parse(data).data;

		res.render('participants', { data, dates });
	});

	router.get('/pravila-kluba', async (req, res) => {
		res.render('rules', {});
	});

	router.get('/contacts', async (req, res) => {
		res.render('contacts', {});
	});

	app.use('/', router);
};
