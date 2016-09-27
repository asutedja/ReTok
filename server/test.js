var tester = require('graphql-tester').tester;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);
 
describe('SWAPI', () => {
    var SwapiTest = tester({
        url: 'http://localhost:3000/graphql',
        method: 'GET'
    });
    
    describe('Successfully getting the name of Person #1', () => {
        var response = SwapiTest("{users{id}}");
        
        it('Returns success', () => {
            return response.should.eventually.have.property('success').equal(true);
        });
        it('Returns the correct Status code', () => {
            return response.should.eventually.have.property('status').equal(200);
        });
        it('Returns the correct name', () => {
            return response.should.eventually.have.deep.property('data.users[0].id').equal(1);
        });
    });
    
    describe('Getting the name of non-existent user 5', () => {
        var response = SwapiTest("{users(id:5){id}}");
        
        it('Returns failure', () => {
            return response.should.eventually.have.property('success').equal(true);
        });
        it('Returns the correct Status code', () => {
            return response.should.eventually.have.property('status').equal(200);
        });
        it('Returns some errors', () => {
            return response.should.eventually.have.property('errors');
        });
    });
    
    describe('Incorrect argument requested', () => {
        var response = SwapiTest('{ person(personId: 1) { name } }');
        
        it('Returns failure', () => {
            return response.should.eventually.have.property('success').equal(false);
        });
        it('Returns the correct Status code', () => {
            return response.should.eventually.have.property('status').equal(400);
        });
        it('Returns some errors', () => {
            return response.should.eventually.have.property('errors');
        });
    });
});
