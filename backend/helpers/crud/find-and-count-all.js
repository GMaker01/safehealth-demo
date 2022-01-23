module.exports = async function (req, res, model, callback) {
    try {
        const { query } = req;

        const matchQuery = query.where || {};

        delete query.where;

        if (query.limit) query.limit = parseInt(query.limit);
        if (query.offset) query.offset = parseInt(query.offset);

        const { docs: data, total: count } = await model.paginate(matchQuery, query);

        return callback(null, { data, count });
    } catch (err) {
        return callback(err);
    }
};

// Docs

/*
    // Dummy request data

    req.query = {
        where : {},
        select:   'title date author',
        sort:     { date: -1 },
        populate: 'author',
        lean:     true,
        offset:   20,
        limit:    10
    };
*/

/*
    var query   = {};
    var options = {
        select:   'title date author',
        sort:     { date: -1 },
        populate: 'author',
        lean:     true,
        offset:   20,
        limit:    10
    };

    model.paginate(query, options).then(function(result) {
        // result.docs - empty array
        // result.total
        // result.limit - 0
        // result.offset - 100
    });
*/

/*
    // Select :

    query.select('a b');  // include a and b, exclude other fields

    query.select('-c -d'); // exclude c and d, include other fields

    query.select({ a: 1, b: 1 });
*/

/*
    // Populate :

    Story.
    find(...).
    populate({
        path: 'fans',
        match: { age: { $gte: 21 }},
        // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
        select: 'name -_id',
        options: { limit: 5 }
    }).
    exec();
*/

/*
    // Nested populate :

    Project.findOne({name: req.query.name})
    .populate({
        path: 'threads',
        populate: {
            path: 'messages',
            model: 'Message',
            populate: {
                path: 'user',
                model: 'User'
            }
        }
    })
*/