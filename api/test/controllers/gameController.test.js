// Import necessary dependencies and modules
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { getGameById } = require('../../src/controllers/gameController');
const GameModel = require('../../src/models/Game');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');


let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Test cases
describe('getGameById', () => {
  it('should return a game when it exists', async () => {
    const mockReq = mockRequest({ params: { gameId: 'someGameId' } });
    const mockRes = mockResponse();

    mockingoose(GameModel).toReturn({ title: 'Mocked Game', id: 'someGameId' }, 'findOne')

    const results = await getGameById(mockReq, mockRes);

    // Assertions
    // expect(Game.findOne).toHaveBeenCalledWith({ gameId: 'someGameId' });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ title: 'Mocked Game', id: 'someGameId' });
  });

  it('should return a 404 error when the game does not exist', async () => {
    const mockReq = mockRequest({ params: { gameId: 'nonexistentGameId' } });
    const mockRes = mockResponse();

    mockingoose(GameModel).toReturn(null, 'findOne')


    await getGameById(mockReq, mockRes);

    // Assertions
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Game not found' });
  });

  it('should return a 500 error on internal server error', async () => {
    const mockReq = mockRequest({ params: { gameId: 'someGameId' } });
    const mockRes = mockResponse();

    // Mock the findOne method of the Game model to throw an error
    Game.findOne.mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    await getGameById(mockReq, mockRes);

    // Assertions
    expect(Game.findOne).toHaveBeenCalledWith({ gameId: 'someGameId' });
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});