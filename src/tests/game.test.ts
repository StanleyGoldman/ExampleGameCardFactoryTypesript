import { createCard, CardName, GameState, MonsterType } from '../game';

describe('Should create minion', () => {

  var gameState: GameState;

  beforeEach(() => {
    gameState = {
      player1: {
        monsters: []
      },
      player2: {
        monsters: []
      }
    };
  });

  test('throw if no player', () => {
    var card = createCard(CardName.CreateStrongMinion);

    expect(() => {
      card.play(gameState);
    }).toThrowError("No target player");
  });

  test('strong', () => {
    var card = createCard(CardName.CreateStrongMinion);

    expect(gameState.player1.monsters).toHaveLength(0);
    expect(gameState.player2.monsters).toHaveLength(0);

    card.play(gameState, gameState.player1);

    expect(gameState.player1.monsters).toHaveLength(1);
    expect(gameState.player2.monsters).toHaveLength(0);

    expect(gameState.player1.monsters[0].type).toBe(MonsterType.Minion);
    expect(gameState.player1.monsters[0].attack).toBe(3);
    expect(gameState.player1.monsters[0].health).toBe(3);
  });

  test('medium', () => {
    var card = createCard(CardName.CreateMediumMinion);

    expect(gameState.player1.monsters).toHaveLength(0);
    expect(gameState.player2.monsters).toHaveLength(0);

    card.play(gameState, gameState.player1);

    expect(gameState.player1.monsters).toHaveLength(1);
    expect(gameState.player2.monsters).toHaveLength(0);

    expect(gameState.player1.monsters[0].type).toBe(MonsterType.Minion);
    expect(gameState.player1.monsters[0].attack).toBe(2);
    expect(gameState.player1.monsters[0].health).toBe(2);
  });

  test('weak', () => {
    var card = createCard(CardName.CreateWeakMinion);

    expect(gameState.player1.monsters).toHaveLength(0);
    expect(gameState.player2.monsters).toHaveLength(0);

    card.play(gameState, gameState.player1);

    expect(gameState.player1.monsters).toHaveLength(1);
    expect(gameState.player2.monsters).toHaveLength(0);

    expect(gameState.player1.monsters[0].type).toBe(MonsterType.Minion);
    expect(gameState.player1.monsters[0].attack).toBe(1);
    expect(gameState.player1.monsters[0].health).toBe(1);
  });
});

describe('Should create enchantment', () => {

  var gameState: GameState;

  beforeEach(() => {
    gameState = {
      player1: {
        monsters: [
          {
            type: MonsterType.Minion,
            attack: 1,
            health: 1
          }]
      },
      player2: {
        monsters: []
      }
    };
  });

  test('throw if no player', () => {
    var card = createCard(CardName.GoldenArmorStrong);

    expect(() => {
      card.play(gameState);
    }).toThrowError("No target player");
  });

  test('strong', () => {
    var card = createCard(CardName.GoldenArmorStrong);

    expect(gameState.player1.monsters[0].attack).toBe(1);
    expect(gameState.player1.monsters[0].health).toBe(1);

    card.play(gameState, gameState.player1);

    expect(gameState.player1.monsters[0].attack).toBe(4);
    expect(gameState.player1.monsters[0].health).toBe(4);
  });

  test('medium', () => {
    var card = createCard(CardName.GoldenArmorMedium);

    expect(gameState.player1.monsters[0].attack).toBe(1);
    expect(gameState.player1.monsters[0].health).toBe(1);

    card.play(gameState, gameState.player1);

    expect(gameState.player1.monsters[0].attack).toBe(3);
    expect(gameState.player1.monsters[0].health).toBe(3);
  });

  test('weak', () => {
    var card = createCard(CardName.GoldenArmorWeak);

    expect(gameState.player1.monsters[0].attack).toBe(1);
    expect(gameState.player1.monsters[0].health).toBe(1);

    card.play(gameState, gameState.player1);

    expect(gameState.player1.monsters[0].attack).toBe(2);
    expect(gameState.player1.monsters[0].health).toBe(2);
  });
});

describe('Should kill monster', () => {

  var gameState: GameState;

  beforeEach(() => {
    gameState = {
      player1: {
        monsters: []
      },
      player2: {
        monsters: [
          {
            type: MonsterType.Minion,
            attack: 1,
            health: 1
          }
        ]
      }
    };
  });

  test('throw if no player', () => {
    var card = createCard(CardName.KillMonster);

    expect(() => {
      card.play(gameState);
    }).toThrowError("No target player");
  });

  test('throw if no monster', () => {
    var card = createCard(CardName.KillMonster);

    expect(() => {
      card.play(gameState, gameState.player1);
    }).toThrowError("No target monster");
  });

  test('works', () => {
    var card = createCard(CardName.KillMonster);

    expect(gameState.player2.monsters).toHaveLength(1);

    card.play(gameState, gameState.player2, gameState.player2.monsters[0]);

    expect(gameState.player2.monsters).toHaveLength(0);
  });
});