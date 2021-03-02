/* eslint-disable prefer-destructuring */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: './public/uploads'
});
const fs = require('fs');


module.exports = (app, db) => {

    router.get('/admin', async (req, res) => {
        let groups = await db.Group.find({});

        res.render('admin-groups', { groups });
    });


    /* DELETE  */
    
    router.get('/delete', async (req, res) => {
        await db.Group.remove({ _id: req.query._id });
        res.redirect('/groups/admin')
    });

    router.post('/delete/chats', async (req, res) => {
        try {

        let chat = await db.Group.findOne({ _id: req.body.groupId });
        let chatIds = [];

        for(let elem of chat.chats) {
            if(elem != req.body.chatId) {
                chatIds.push(elem);
            }
        }

        await db.Group.updateOne({ _id: req.body.groupId[0] }, { chats: chatIds });
        res.redirect('/groups/admin');
    } catch(err) {
        res.send('OK');
    }


    });

    /* DELETE */

    router.post('/', upload.any(), async (req, res) => {
        await db.Group.create({
            name: req.body.name,
            description: req.body.description,
            img: req.files[0].filename
        });

        res.redirect('/uploads');
    });

    router.post('/chats', async (req, res) => {
        let chat = await db.Group.findOne({ _id: req.body.groupId });
        let chatIds = chat.chats;
        chatIds.push(req.body.chatId);

        await db.Group.updateOne({ _id: req.body.groupId[0] }, { chats: chatIds });
        res.redirect('/groups/admin');

    });

    router.get('/', async (req, res) => {
        let groups = await db.Group.find({});

        res.render('groups', { groups });
    });

    router.get('/:_id', async (req, res) => {
        let currDate = new Date();
        let dates = []

        for (let i = 0; i < 5; i++) {
            dates.push(`${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()}`)
            currDate.setDate(currDate.getDate() - 1);
        }

        dates.reverse();

        let data = await fs.readFileSync(__dirname + '/../public/uploads/botFile.json', 'utf8');
        data = JSON.parse(data).data;

        group = await db.Group.findOne({ _id: req.params._id });

        let result = []
        for (let elem of data) {
            if (group.chats.indexOf(elem.chatId) != -1) {
                result.push(elem);
            }
        }

        res.render('participants', { data: result, dates });
    });




    app.use('/groups', router);
};
