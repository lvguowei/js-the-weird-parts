(function (global, $) {
    // Saves the user from typing the new keyword
    var Greeter = function (firstname, lastname, language) {
        return new Greeter.init(firstname, lastname, language);
    };

    var supportedLangs = ['en', 'es'];

    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    };

    Greeter.prototype = {
        fullname: function () {
            return this.firstname + ' ' + this.lastname;
        },
        validate: function () {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        greeting: function () {
            return greetings[this.language] + ' ' + this.firstname + '!';
        },
        formalGreeting: function () {
            return formalGreetings[this.language] + ', ' + this.fullname();
        },
        greet: function (formal) {
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }
            return this;
        },
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullname());
            }
            return this;
        },
        setLang: function(lang) {
            this.language = lang;
            this.validate();
            return this;
        },
        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }
            if (!selector) {
                throw 'Missing selector';
            }

            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            $(selector).html(msg);
            return this;
        }
    };

    Greeter.init = function (firstname, lastname, language) {
        this.firstname = firstname || '';
        this.lastname = lastname || '';
        this.language = language || 'en';

    };

    Greeter.init.prototype = Greeter.prototype;

    global.Greeter = global.G$ = Greeter;

})(window, jQuery);

