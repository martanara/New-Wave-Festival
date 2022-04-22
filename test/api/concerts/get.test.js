
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');
const Seat = require('../../../models/seat.model');
const Day = require('../../../models/day.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET / api/concerts', () => {

  before(async () => {
    const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'John Doe', genre: 'Pop', price: 25, day: '5d9f1140f10a81216cfd4333', image: '/img/uploads/1fsd324fsdg.jpg' });
    await testConcertOne.save();
  
    const testConcertTwo = new Concert({ _id: '5d9f1140f10a81216cfd4409', performer: 'Jane Doe', genre: 'Rock', price: 40, day: '5d9f1140f10a81216cfd4339', image: '/img/uploads/1fsd324bbb.jpg' });
    await testConcertTwo.save();

    const testDayOne = new Day({ _id: '5d9f1140f10a81216cfd4333', festivalDay: 1 });
    await testDayOne.save();

    const testDayTwo = new Day({ _id: '5d9f1140f10a81216cfd4339', festivalDay: 2 });
    await testDayTwo.save();

    const testSeatOne = new Seat({ _id: '5d9f1140f10a81216cfd4412', day: '5d9f1140f10a81216cfd4333', seat: 3, client: 'Amanda Smith', email: 'amanda@smith.com' });
    await testSeatOne.save();
  });

  it('/ should return all concerts with correct day assigned and correct free seats count', async () => {
    const res = await request(server).get('/api/concerts');
    const concertOne = res.body[0];
    const concertTwo = res.body[1];
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    expect(concertOne.day).to.be.equal(1);
    expect(concertTwo.day).to.be.equal(2);
    expect(concertOne.ticketsLeft).to.be.equal(49);
    expect(concertTwo.ticketsLeft).to.be.equal(50);
  });

  after(async () => {
    await Concert.deleteMany();
    await Day.deleteMany();
    await Seat.deleteMany();
  });

});