module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Users',
      timestamps: false,
    },
  );

  User.associate = ({ UserCompany, Schedule }) => {
    User.hasMany(UserCompany, {
      foreignKey: 'id',
      otherKey: 'userId',
      as: 'userCompany',
    });

    User.hasMany(Schedule, {
      foreignKey: 'id',
      otherKey: 'userId',
      as: 'schedule',
    });
  };

  return User;
};
