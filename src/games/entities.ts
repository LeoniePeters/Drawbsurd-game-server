import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Turn = 'drawing' | 'guessing'

export type Canvas = any
export type Answer = any

type Status = 'pending' | 'started' | 'finished'

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { default: 'Empty canvas' })
  canvas: Canvas

  @Column('text', { default: 'wait for it' })
  answer: Answer

  @Column('text', { default: null })
  phrase: String

  @Column('text', { default: 'drawing' })
  turn: Turn

  @Column('text', { default: 'Nobody' })
  winner: String

  @Column('text', { default: 'started' })
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, { eager: true })
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'turn'], { unique: true })
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
