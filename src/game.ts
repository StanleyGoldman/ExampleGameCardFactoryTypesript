export interface Card {
    name: CardName;
    play(game: GameState, targetPlayer?: PlayerState, targetMonster?: Monster): void;
}

export enum CardName {
    // When played creates a minion monster
    CreateStrongMinion,
    CreateMediumMinion,
    CreateWeakMinion,

    // When played enchants all monsters
    GoldenArmorStrong,
    GoldenArmorMedium,
    GoldenArmorWeak,

    // When played kills a monster
    KillMonster,
}

export enum MonsterType {
    Minion
}

export interface Monster {
    type: MonsterType;
    health: number;
    attack: number;
}

export interface PlayerState {
    monsters: Monster[];
}

export interface GameState {
    player1: PlayerState;
    player2: PlayerState;
}

type PlayFunction = (game: GameState, targetPlayer?: PlayerState, targetMonster?: Monster) => void;

function createMinionFunctionFactory(health: number, attack: number): PlayFunction {
    return (game: GameState, targetPlayer?: PlayerState, targetMonster?: Monster) => {
        if (!targetPlayer) {
            throw "No target player";
        }

        var monster: Monster = {
            type: MonsterType.Minion,
            attack,
            health
        };

        targetPlayer.monsters.push(monster);
    };
}

function goldenArmorFunctionFactory(enchant: number): PlayFunction {
    return (game: GameState, targetPlayer?: PlayerState, targetMonster?: Monster) => {
        if (!targetPlayer) {
            throw "No target player";
        }

        targetPlayer.monsters.forEach(monster => {
            monster.attack = monster.attack + enchant;
            monster.health = monster.health + enchant;
        });
    };
}

function killMonsterFunctionFactory(): PlayFunction {
    return (game: GameState, targetPlayer?: PlayerState, targetMonster?: Monster) => {
        if (!targetPlayer) {
            throw "No target player";
        }

        if (!targetMonster) {
            throw "No target monster";
        }

        targetPlayer.monsters = targetPlayer.monsters.filter((monster)=>monster !== targetMonster);
    };
}

export function createCard(name: CardName): Card {
    var play: PlayFunction;

    switch (name) {
        case CardName.CreateWeakMinion:
            play = createMinionFunctionFactory(1, 1);
            break;
        case CardName.CreateMediumMinion:
            play = createMinionFunctionFactory(2, 2);
            break;
        case CardName.CreateStrongMinion:
            play = createMinionFunctionFactory(3, 3);
            break;

        case CardName.GoldenArmorWeak:
            play = goldenArmorFunctionFactory(1);
            break;
        case CardName.GoldenArmorMedium:
            play = goldenArmorFunctionFactory(2);
            break;
        case CardName.GoldenArmorStrong:
            play = goldenArmorFunctionFactory(3);
            break;

        case CardName.KillMonster:
            play = killMonsterFunctionFactory();
            break;

        default:
            throw "Out of range";
    }

    return {
        name,
        play
    }
}