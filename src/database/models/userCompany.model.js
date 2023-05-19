module.exports = (sequelize, DataTypes) => {
  const UserCompany = sequelize.define(
    'UserCompany',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      tableName: 'UsersCompanies',
      timestamps: false,
    },
  );

  UserCompany.associate = ({ Company }) => {
    // UserCompany.belongsToMany(User, {
    //   foreignKey: 'userId',
    //   otherKey: 'id',
    //   as: 'user',
    // });

    UserCompany.belongsTo(Company, {
      foreignKey: 'companyId',
      otherKey: 'id',
      as: 'company',
    });
  };

  return UserCompany;
};
