module.exports = function(sequelize, DataTypes){
   var house = sequelize.define('houses', {
      // Model attributes are defined here
      id : {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      name: {
         type:DataTypes.STRING,
      },
      default_time: {
         type: DataTypes.INTEGER
      },
      frequency_duration: {
         type: DataTypes.STRING
      },
      frequency_hour: {
         type: DataTypes.STRING
      },
      frequency_date: {
         type: DataTypes.STRING
      }
    }, {
      // Other model options go here
    });

    house.sync();
    return house;
};
