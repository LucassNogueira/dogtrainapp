const Sequelize = require("sequelize");
const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize.query(
      `
            drop table if exists dogs;
            drop table if exists breeds;
            drop table if exists commands;

            create table breeds(
                breed_id serial primary key,
                breed_name varchar(255),
                img_url varchar(255)
            );

            create table dogs (
                dog_id serial primary key,
                breed_id int references breeds(breed_id),
                name varchar(255),
                level int not null
            );

            create table Commands (
                command_id serial primary key,
                name varchar(255),
                level int not null
                desc text
            );
            `
    );
  },
};
