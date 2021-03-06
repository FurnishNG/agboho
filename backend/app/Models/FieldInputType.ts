import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { TIMEZONE_DATE_TIME_FORMAT } from 'App/Helpers/utils'
import Attribute from './Attribute'
import UUIDHook from './Hooks/UUIDHook'

export default class FieldInputType extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public code: string

  @column.dateTime({
    autoCreate: true,
    serialize(value: DateTime) {
      return value ? value.toFormat(TIMEZONE_DATE_TIME_FORMAT) : ''
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize(value: DateTime) {
      return value ? value.toFormat(TIMEZONE_DATE_TIME_FORMAT) : ''
    },
  })
  public updatedAt: DateTime

  @hasMany(() => Attribute)
  public attributes: HasMany<typeof Attribute>

  @beforeCreate()
  public static generateUUID(model: FieldInputType) {
    UUIDHook.generateUUID(model, 'id')
  }
}
