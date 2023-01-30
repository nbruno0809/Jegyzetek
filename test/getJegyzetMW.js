var expect = require('chai').expect
var getJegyzetMW = require('../middleware/jegyzetek/getJegyzetMW')

describe('getJegyzet middleware ', function() {
    //1.
    it('Should get the "jegyzet" from db and set res.locals.jegyzet', function(done){
        const mw = getJegyzetMW({
            JegyzetModel: {
                findOne: (p,callback) => {
                    expect(p).to.be.eql({_id: '5'})
                    callback(null,'MockJegyzet')
                }
            }
        })
        
        const res = {locals: {}}

        mw({params: {jegyzetid: '5'}},res,(err)=>{
            expect(err).to.be.eql(undefined)
            expect(res.locals).to.be.eql({jegyzet: "MockJegyzet"})
            done()
        })

    })
    //2.
    it('Should call next with error if a problem occured with db ', function(done){
        const mw = getJegyzetMW({
            JegyzetModel: {
                findOne: (p,callback) => {
                    expect(p).to.be.eql({_id: '5'})
                    callback("dbError",null)
                }
            }
        })
        
        const res = {locals: {}}

        mw({params: {jegyzetid: '5'}},res,(err)=>{
            expect(err).to.be.eql('dbError')
            done()
        })

    })


    //3.
    it('Should call next if the jegyzet was not found', function(done){
        const mw = getJegyzetMW({
            JegyzetModel: {
                findOne: (p,callback) => {
                    expect(p).to.be.eql({_id: '5'})
                    callback(undefined,null)
                }
            }
        })
        
        const res = {locals: {}}

        mw({params: {jegyzetid: '5'}},res,(err)=>{
            expect(err).to.be.eql(undefined)
            expect(res.locals).to.be.eql({})
            done()
        })

    })


})