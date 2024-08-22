const pgp = require('pg-promise')();
const {faker} = require('@faker-js/faker/locale/pt_BR');

const cn = {
    host: 'localhost',
    port: 5434,
    database: 'trabalho1',
    user: `ifc`,
    password: 'ifc2024'
};

const db = pgp(cn);

for (let i = 0; i < 1000000; i++) {
    await db.none('INSERT INTO pessoas (nome, data_nascimento) VALUES ($1, $2)', [faker.person.fullName(), faker.date.past()]);
    if (i % 1000 === 0) {
        console.log(i);
    }
}