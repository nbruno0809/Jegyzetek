var expect = require('chai').expect
var getTargyakMw = require('../middleware/targyak/getTargyakMW')

describe('getJegyzet middleware ', function() {
    //1.
    it('Should get all "targy" from db and set res.locals.targyak', function(done){
        const mw = getTargyakMw({
            TargyModel: {
                find: (p,callback) => {
                    expect(p).to.be.eql({})
                    callback(null,'MockTargyak')
                }
            }
        })
        
        const res = {locals: {}}

        mw({},res,(err)=>{
            expect(err).to.be.eql(undefined)
            expect(res.locals).to.be.eql({targyak: "MockTargyak"})
            done()
        })

    })

    //2.
    it('Should call next with error if a problem occured with db', function(done){
        const mw = getTargyakMw({
            TargyModel: {
                find: (p,callback) => {
                    expect(p).to.be.eql({})
                    callback("dbError",null)
                }
            }
        })
        
        const res = {locals: {}}

        mw({},res,(err)=>{
            expect(err).to.be.eql("dbError")
            done()
        })

    })


})