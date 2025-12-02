// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/usersModel");
const treeModel = require("../models/treesModel");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ TREE BY USERID
// ##############################################################
module.exports.readTreeByUserId = (req, res, next) => {
    const data = {
        userId: req.params.userId
    }
    const callback = (error, results, fields) => {
        if (error) {
        console.error("Error getTreeByUserId:", error);
        res.status(500).json(error);
        } else {
        if(results.length === 0) {
            res.status(404).json({
            message: "No trees found."
            });
            return;
        }
    
        res.status(200).json(results);
        }
    };
    
    model.selectTreesByUserId(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR WATER TREE BY USERID
// ##############################################################
module.exports.waterTreeByUserId = (req, res, next) => {
    const data = {
        userId: req.params.userId,
        treeId: req.params.treeId
    }
    const callback = (error, results, fields) => {
        if (error) {
        console.error("Error waterTreeByUserId:", error);
        res.status(500).json(error);
        } else {
        res.status(204).send();
        }
    };
    
    model.waterTreeByUserId(data, callback);
}

// ##############################################################
// DEFINE MIDDLEWARE FUNCTION FOR CHECK TREE OWNERSHIP
// ##############################################################
module.exports.checkTreeOwnership = (req, res, next) => {
    const data = {
        userId: parseInt(req.params.userId),
        treeId: req.params.treeId,
        id: req.params.treeId
    }
    const callback = (error, results, fields) => {
        if (error) {
        console.error("Error checkTreeOwnership:", error);
        res.status(500).json(error);
        } else {

        // console.log(results[0].user_id);    
        // console.log(data);    
        
        if(results.length === 0) {
            res.status(404).json({
            message: "Tree not found."
            });
            return;
        }
        else if(results[0].user_id != data.userId) {
            res.status(403).json({
            message: "Tree does not belong to user."
            });
            return;
        }
        next();
        }
    };
    
    treeModel.selectTreeById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR GET AVERAGE AGE OF 
// TREES OWNED BY USER
// ##############################################################
module.exports.getAverageAgeOfTreesOwnedByUser = (req, res, next) => {
    const data = {
        userId: req.params.userId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAverageAgeOfTreesOwnedByUser:", error);
            res.status(500).json(error);
        } else {
            if(results.length === 0) {
                res.status(404).json({
                    message: "No trees found."
                });
                return;
            }

            let totalAge = 0;
            results.forEach((tree) => {
                totalAge += tree.age;
            });

            const averageAge = totalAge / results.length;

            res.status(200).json({
                averageAge: averageAge,
                numberOfTrees: results.length
            });
        }
    };
    
    model.selectTreesByUserId(data, callback);
}