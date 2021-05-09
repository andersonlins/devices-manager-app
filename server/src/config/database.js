module.exports = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'admin',
    database: 'projectname_db',
    port: 3306,
    define: {
      timestamps: false,
      underscored: true,
      underscoredAll: true,
    },
}