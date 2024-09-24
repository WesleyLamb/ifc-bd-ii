const pgp = require('pg-promise')();
const format = require('pg-format');
const {faker} = require('@faker-js/faker/locale/pt_BR');

const cn = {
    host: 'localhost',
    port: 5434,
    database: 'ifc-bd-ii-trab-2',
    user: `ifc`,
    password: 'ifc2024'
};

const db = pgp(cn);

fn = () => {
    let arr = [];
    for (let j = 0; j < 100000; j++) {
        arr.push([faker.person.fullName(), faker.date.past({year: 60})]);
    }
    return arr;
}

fn2 = async () => {
    for (let i = 0; i < (500); i++) {
        arr = fn();
        await db.none(format('INSERT INTO pessoas (nome, data_nascimento) VALUES %L', arr));
        if (i % 1000 === 0) {
            console.log(i);
        }
    }
}

fn2();