const pool = require('../database/database')

const enseignantController = {
    getAll: async (req, res) => {

        try {
            const [rows, fields] = await pool.query("select * from enseignant ORDER BY id DESC")

            res.json({
                data: rows
            })
            
        } catch (error) {
            console.log(error)
            res.json({
                status: error
            })
        }

    }, 

    getMinMax: async (req, res) => {

        try {
            const [rows, fields] = await pool.query("select min(salaire) AS salaire_min, max(salaire) AS salaire_max from enseignant")

            res.json({
                data: rows
            })
            
        } catch (error) {
            console.log(error)
            res.json({
                status: error
            })
        }

    }, 

    getById : async (req, res) => {

        try {
            
            const {id} = req.params

            const [rows, fields] = await pool.query("select * from enseignant where id = ?", [id])

            res.json({
                data: rows
            })

        } catch (error) {
            console.log(error)
            res.json({
                status: error
            })
        }
    }, 

    create : async (req, res) => {

        try {

            const {nom, taux_horaire, nbr_heure} = req.body
            var salaire = taux_horaire*nbr_heure;

            const [existdata, field] = await pool.query("select * from enseignant where nom = ? and taux_horaire = ? and nbr_heure = ? and salaire = ?", [nom, taux_horaire, nbr_heure, salaire])

            if (existdata == '') {
                
                const sql = "insert into enseignant (nom, taux_horaire, nbr_heure, salaire) value (?, ?, ?, ?)"
                const [rows, fields] = await pool.query(sql, [nom, taux_horaire, nbr_heure, salaire])

                res.json({
                    data: rows
                })
               
            } else {

                res.json({
                    data: 'existdata'
                })
            }

           
            
        } catch (error) {
            console.log(error)
            res.json({
                status: error
            })
            
        }

    }, 

    update : async (req, res) => {

        try {
            
            const {nom, taux_horaire, nbr_heure} = req.body

            const {id} = req.params
            var salaire = taux_horaire*nbr_heure;


            const sql = "update enseignant set nom = ?, taux_horaire = ?, nbr_heure = ?, salaire = ? where id = ?"

            const [rows, fields] = await pool.query(sql, [nom, taux_horaire, nbr_heure, salaire, id])

            res.json({
                data: rows
            })

        } catch (error) {
            console.log(error)
            res.json({
                status: error
            })
            
        }

    },

    delete : async (req, res) => {

        try {
            
            const {id} = req.params

            const [rows, fields] = await pool.query("delete from enseignant where id = ?", [id])

            res.json({
                data: rows
            })

        } catch (error) {
            console.log(error)
            res.json({
                status: error
            })
            
        }

    }

}

module.exports = enseignantController