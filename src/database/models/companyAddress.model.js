module.exports = (sequelize, DataTypes) => {
  const CompanyAddress = sequelize.define(
    'CompanyAddress',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      complement: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      houseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: 'CompanyAddresses',
      timestamps: false,
    },
  );

  CompanyAddress.associate = ({ Company }) => {
    CompanyAddress.belongsTo(Company, {
      foreignKey: 'companyId',
      otherKey: 'id',
      as: 'company',
    });
  };

  return CompanyAddress;
};
