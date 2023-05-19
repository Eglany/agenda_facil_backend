module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'Company',
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
      tableName: 'Companies',
      timestamps: false,
    },
  );

  Company.associate = ({
    CompanyAddress, Service, BusinessHour, UserCompany, Schedule,
  }) => {
    Company.hasMany(CompanyAddress, {
      foreignKey: 'companyId',
      otherKey: 'id',
      as: 'companyAddresses',
    });

    Company.hasMany(Service, {
      foreignKey: 'companyId',
      otherKey: 'id',
      as: 'service',
    });

    Company.hasMany(BusinessHour, {
      foreignKey: 'companyId',
      otherKey: 'id',
      as: 'businessHours',
    });

    Company.hasMany(UserCompany, {
      foreignKey: 'companyId',
      otherKey: 'id',
      as: 'userCompany',
    });

    Company.hasMany(Schedule, {
      foreignKey: 'companyId',
      otherKey: 'id',
      as: 'schedules',
    });
  };

  return Company;
};
