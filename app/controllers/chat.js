const { emit } = require("../../config/server");

module.exports.iniciaChat = function(application, req, res) {
    var dadosForm = req.body;
    
    req.assert('nickname', 'Name or nickname is mandatory').notEmpty();
    req.assert('nickname', 'Name or nickname must have between 3 and 15 characters').len(3, 15);

    var errors = req.validationErrors();

    if(errors) {
        res.render('index', {validation: errors})
        return;
    }

    application.get('io').emit(
        'msgForClient', 
        {nickname: dadosForm.nickname, message: ' entrou na sala'}
    )

    res.render('chat', {dadosForm: dadosForm});
}