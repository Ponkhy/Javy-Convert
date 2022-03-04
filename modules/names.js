const PATH = require('path');

module.exports = function (input) { 
    let name = PATH.basename(input);
    let ext = PATH.extname(input);
    let withoutExt = PATH.basename(name, ext);

    return { name: name, ext: ext, withoutExt: withoutExt, input: input };
};
