const fs = require('fs')
const fetch = require('node-fetch');

module.exports.downloadImg = function (url, path) {
    let promise = new Promise(async function (resolve, reject) {
        try {
            const response = await fetch(url);
            const buffer = await response.buffer();
            fs.writeFile(path, buffer, () => {
                console.log('finished downloading!')
            });
            resolve({})
        } catch (err) {
            console.log('save image err ----------------- ')
            console.log(err);
            reject({})
        }
    });

    return promise;
};

module.exports.updateTags = function (rows, tagName, db) {
    let promise = new Promise(async function (resolve, reject) {

        for (let row of rows) {
            let instance = {}
            instance[tagName] = true;

            if (tagName == 'isSale') {
                instance['salePrice'] = row[1];
            }
            console.log(instance);
            console.log(row[0]);
            let x = await db.Book.findOneAndUpdate({ isnb: row[0] }, { $set: instance });
            console.log(x);
        }
        resolve({})
    });

    return promise;
};


module.exports.dropTags = function (tagName, db) {
    let promise = new Promise(async function (resolve, reject) {
        let instance = {}
        instance[tagName] = false;
        if (tagName == 'isSale') {
            instance['salePrice'] = null;
        }

        await db.Book.updateMany({}, { $set: instance });
        resolve({})
    });

    return promise;
};


module.exports.getPagination = function (currentPage = 1, docs) {
    let prevPage = Math.max(+currentPage - 2, 1);
    // TODO: possible bug, do not have end page.
    let nextPage = Math.min(+currentPage + 3, docs.totalPages);
    let pages = [];

    for (let i = prevPage; i <= nextPage; i++) {
        pages.push(i);
    }

    return {
        currentPage,
        prevPage,
        nextPage,
        pages,
    }
}

/* returns first n words, seperator is space */
module.exports.getShort = function (text, n) {
    if (!text) return null;

    text = text.split(' ');
    let shortText = text.slice(0, n + 1).join(' ');
    return shortText;
}


// return books list and order total
module.exports.getBooksFromIds = async function (cart, db) {
    let ids = [];
    let orderTotal = 0;

    // In case of empty cart
    if (!cart) {
        cart = [];
    }

    for (let i = 0; i < cart.length; i++) {
        ids.push(cart[i]._id);
    }


    let books = await db.Book.find({ '_id': { $in: ids } });

    for (let elem of cart) {
        let axilary = books.map(function (e) { return e._id; });
        for (let i = 0; i < axilary.length; i++) {
            if (axilary[i] == elem._id) {
                books[i].cartCount = elem.amount;
                books[i].cartCountTotal = elem.amount * books[i].price;
                orderTotal += books[i].cartCountTotal;
                break;
            }
        }
    }

    return { books, orderTotal };
}