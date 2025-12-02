// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE SELECT TREES BY USER ID
// ##############################################################
module.exports.selectTreesByUserId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Tree WHERE user_id = ?;`;
    const VALUES = [data.userId];
    
    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE WATER TREE BY USER ID
// ##############################################################
module.exports.waterTreeByUserId = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Tree SET watered_on = NOW() WHERE user_id = ? AND id = ?;`;
    const VALUES = [data.userId, data.treeId];
    
    pool.query(SQLSTATEMENT, VALUES, callback);
};

