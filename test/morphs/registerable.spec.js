var expect = require('chai').expect;
var async = require('async');

describe('Registerable', function() {
    it('should have registerable static flag', function(done) {
        expect(User.registerable).to.be.true;
        done();
    });

    it('should have registerable attributes', function(done) {
        expect(User._attributes.registeredAt).to.exist;
        done();
    });


    it('should have register function', function(done) {
        expect(User.register).to.be.a("function");
        done();
    });

    it('should be able to register new registerable', function(done) {
        var user = {
            email: 'user@example.com',
            password: 'password'
        }

        User
            .register(user, function(error, registerable) {
                if (error) {
                    done(error);
                } else {
                    expect(registerable.id).to.exist;
                    done();
                }
            });
    });

    it('should be able to unregister itself', function(done) {
        async
            .waterfall(
                [
                    function(next) {
                        User
                            .findOneByEmail('user@example.com')
                            .exec(next);
                    },
                    function(registerable, next) {
                        expect(registerable.unregister).to.be.a('function');
                        next(null, registerable);
                    },
                    function(registerable, next) {
                        registerable.unregister(next);
                    },
                    function(registerable, next) {
                        expect(registerable.unregisteredAt).to.not.be.null;
                        next(null, registerable);
                    }
                ],
                function(error, registerable) {
                    if (error) {
                        done(error);
                    } else {
                        done();
                    }
                });

    });
});