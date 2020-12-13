module.exports = (sequelize, DataTypes) => {

    let Record = sequelize.define('Record', {
        uniqueKey: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        hours: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        medium: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        notes: {
            type: DataTypes.STRING
        }
    })

    Record.sync({force: false}).then( () => {
        console.log('Synced records table ')
    })
    return Record
}