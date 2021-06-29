module.exports = (sequelize, Sequelize) => {
    let SmsVerification = sequelize.define("smsVerification", {
        svid: {
            type: Sequelize.STRING(64),
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        code: Sequelize.STRING,
        auth_key: {
            type: Sequelize.STRING,
            unique: true
        },
        session_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return SmsVerification;
}