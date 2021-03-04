/* eslint-disable prefer-destructuring */
const express = require('express');
const router = express.Router();

module.exports = (app, db) => {
	router.get('/', async (req, res) => {
		res.render('index', {});
	});

	router.get('/magiya-utra-skachat', async (req, res) => {
		res.render('books', {});
	});

	

	router.get('/pravila-kluba', async (req, res) => {
		res.render('rules', {});
	});

	router.get('/intro', async (req, res) => {
		res.render('intro', {});
	});

	router.get('/contacts', async (req, res) => {
		res.render('contacts', {});
	});

	app.use('/', router);
};
