(function(global, $) {
    var Greeter = function(firstname, lastname, language) {
        return new Greeter.init(firstname, lastname, language);
    };

    Greeter.prototype = {};

    Greeter.init = function(firstname, lastname, language) {
        this.firstname = firstname || '';
        this.lastname = lastname || '';
        this.language = language || 'en';
    };

    Greeter.init.prototype = Greeter.prototype;

    global.Greeter = global.g$ = Greeter;

})(window, jQuery);

