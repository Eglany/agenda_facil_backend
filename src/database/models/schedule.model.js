module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    'Schedule',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      serviceId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'services',
          key: 'id',
        },
      },
      companyId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'company',
          key: 'id',
        },
      },
    },
    {
      tableName: 'Schedules',
      timestamps: false,
    },
  );

  Schedule.associate = ({ User, Service, Company }) => {
    Schedule.belongsTo(User, {
      foreignKey: 'userId',
      otherKey: 'id',
      as: 'user',
    });

    Schedule.belongsTo(Service, {
      foreignKey: 'serviceId',
      otherKey: 'id',
      as: 'service',
    });

    Schedule.belongsTo(Company, {
      foreignKey: 'companyId',
      otherKey: 'id',
      as: 'company',
    });
  };

  return Schedule;
};
