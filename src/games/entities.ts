import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Turn = 'drawing' | 'guessing'
export type Row = [ Symbol | null, Symbol | null, Symbol | null ]
export type Board = [ Row, Row, Row ]

export type Canvas = any
export type Answer = any

type Status = 'pending' | 'started' | 'finished'

const emptyRow: Row = [null, null, null]
const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  // added to use
  @Column('text', {default: 'Empty canvas'})
  canvas: Canvas

  @Column('text', {default: 'Waiting'})
  answer: Answer

  @Column('text', {default: 'drawing'})
  turn: Turn

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'turn'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column('text')
  turn: Turn

  @Column('integer', { name: 'user_id' })
  userId: number
}
