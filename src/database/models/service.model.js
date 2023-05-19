module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    'Service',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
      },
      averageTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'campanies',
          key: 'id',
        },
      },
    },
    {
      tableName: 'Services',
      timestamps: false,
    },
  );

  Service.associate = ({ Schedule, Company }) => {
    Service.hasMany(Schedule, {
      foreignKey: 'serviceId',
      otherKey: 'id',
      as: 'schedules',
    });

    Service.belongsTo(Company, {
      foreignKey: 'companyId',
      otherKey: 'id',
      as: 'company',
    });
  };

  return Service;
};
