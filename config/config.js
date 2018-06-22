
module.exports = {
    apiversionpath: '/api/v1',
    dbuse: process.env.MONGO_DB_USE,
    db: {
        mongolab: {
            user: process.env.MLAB_USER,
            password: process.env.MLAB_PASSWORD,
            uri: process.env.MLAB_URI,
            port: process.env.MLAB_PORT,
            dbname: process.env.MLAB_DBNAME,
        },
        mongo: {
            uri: process.env.MONGO_LOCAL_URI,
            port: process.env.MONGO_LOCAL_PORT,
            dbname: process.env.MONGO_LOCAL_DBNAME,
        },
    }
}