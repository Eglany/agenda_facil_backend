module.exports = (sequelize, DataTypes) => {
  const BusinessHour = sequelize.define(
    'BusinessHour',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      weekDay: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      openTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      closeTime: {
        type: DataTypes.TIME,
        allowNull: false,
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
      tableName: 'BusinessHours',
      timestamps: false,
    },
  );

  BusinessHour.associate = ({ Company }) => {
    BusinessHour.hasMany(Company, {
      foreignKey: 'id',
      otherKey: 'companyId',
      as: 'company',
    });
  };

  return BusinessHour;
};
