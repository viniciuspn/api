const _ = require('underscore');


module.exports = function () {
	function validaBody(body, index) {
		var camposNaoPreenchidos = [];
		_.each(index, function (value) {
			if (_.has(body, value)) {
				if (_.isUndefined(body[value]) || (!_.isNumber(body[value]) && _.isEmpty(body[value])) || _.isNull(body[value])) {
					camposNaoPreenchidos.push(value);
				}
			} else {
				camposNaoPreenchidos.push(value);
			}
		});
		return camposNaoPreenchidos;
	}

	return {
		validaBody: validaBody
	};
};
