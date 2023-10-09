const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const router = express.Router();

const uri = "mongodb+srv://aostrovtsov:Zuyu2893@cluster0.9ebmahm.mongodb.net/locations?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const locationStorage = {
    locations: []
};

router.post('/add-location', (req, res, next) => {
    client.connect((err, client) => {
        const db = client.db(dbName);

        db.collection('user-locations')
            .insertOne({
                address: req.body.address,
                coords: {
                    lat: req.body.lat,
                    lng: req.body.lng
                }
            },
                (err, r) => {
                    console.log(r);
                    res.json({ message: 'Stored location!', locId: r.insertedId });
                }
            );
    });

    // locationStorage.locations.push({
    //     id: Math.float(Math.random() * 1000),
    //     address: req.body.address,
    //     coords: { lat: req.body.lat, lng: req.body.lng }
    // });

});

router.get('/location/:lid', (req, res, next) => {
    const locationId = req.params.lid;

    client.connect((err, client) => {
        const db = client.db(dbName);

        db.collection('user-locations')
            .findOne({ _id: new mongodb.ObjectId(locationId) },
                (err, doc) => {
                    if (!doc) {
                        return res.status(404).json({ message: 'Not found!' });
                    }

                    res.json({
                        address: doc.address,
                        coordinates: doc.coords
                    });
                }
            );
    });
});

module.exports = router;