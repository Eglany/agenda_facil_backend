require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./database/models');

const PORT = process.env.DEV_PORT || 3001;

process.on('SIGINT', () => {
  sequelize.close().then(() => {
    console.log('Sequelize connection closed.');
    process.exit();
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
