"use strict";

const moment = require('moment-timezone')

module.exports = (sequelize, DataTypes) => {
  // const dateNow = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
  const auth = sequelize.define(
    "auths",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      role_auth_id: DataTypes.STRING,
      lasts_login: DataTypes.STRING,
      last_activity: DataTypes.STRING,
      created_at: DataTypes.STRING,
      updated_at: DataTypes.STRING,
      id_user: DataTypes.STRING,
      ip: DataTypes.STRING,
      source: DataTypes.STRING,
      platform: DataTypes.STRING,
      os: DataTypes.STRING,
      version: DataTypes.STRING,
      // phone_number: DataTypes.STRING,
      browser: DataTypes.STRING,
      // otp: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate(param, option) {
          const dateNow = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
          param.created_at = dateNow
          param.updated_at = dateNow
          param.lasts_login = dateNow
          param.last_activity = dateNow
        },
        beforeUpdate(param, option) {
          const dateNow = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
          param.updated_at = dateNow
          param.lasts_login = dateNow
          param.last_activity = dateNow
        }
      },
      indexes: [
        {
          unique: true,
          fields: ["id"]
        },
      ],
    }
  );
  auth.associate = function (models) {
    // associations can be defined here
  };
  return auth;
};
