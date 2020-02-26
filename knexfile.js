// Update with your config settings.

module.exports = {

    test: {
        client: 'sqlite3',
        connection: {
            filename: ':memory:'
        },
        seeds: {
            directory: './tests/seeds'
        }
    },

    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3'
        },
        seeds: {
            directory: './server/db/seeds',
        },
        migrations: {
            directory: './server/db/migrations'
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};