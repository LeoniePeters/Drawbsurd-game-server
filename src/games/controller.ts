import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player } from './entities'
import { io } from '../index'

const phrases = ['duck robs a bank', 'to be on top of the world', 'cat smokes a cigar', 'to have a snake in pocket',
  'monkey having a BBQ', 'wild programmer', 'git hell', 'space battle', 'coffee at Codaisseur', 'homework on Saturday',
  'DRY - do not repeat yourself', 'rubber ducking', 'test yourself before you wreck yourself', 'an elephant riding a bike',
  'papaya on holidays', 'programmer and designer', 'full-stack app', 'breakfast on steroids', 'eating a marmelade',
  'healthy lunch', 'Henk eats an apple-pie'];


@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create({
      phrase: phrases[Math.floor(Math.random() * phrases.length)]
    }).save()

    await Player.create({
      game: entity,
      user,
      turn: 'drawing'
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    // if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    game.status = 'started'
    await game.save()

    const player = await Player.create({
      game,
      user,
      turn: 'guessing'
    }).save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch('/games/:id([0-9]+)')
  async updateGameData(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update: any
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    //if (player.turn !== game.turn) throw new BadRequestError(`It's not your turn`)

    if (!update.data.includes('lines' && 'width')) {
      game.answer = update.data
    } else {
      game.canvas = update.data
    }

    await game.save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)')
  @HttpCode(201)
  async changeStatus(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update: any
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)

    game.status = 'finished'
    game.winner = update.winner
    await game.save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  getGames() {
    return Game.find()
  }

}

