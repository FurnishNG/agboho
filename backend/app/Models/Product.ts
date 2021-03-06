import { DateTime } from 'luxon'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import ProductType from 'App/Models/ProductType'
import AttributeSet from 'App/Models/AttributeSet'
import ProductCategory from 'App/Models/ProductCategory'
import Company from 'App/Models/Company'
import UUIDHook from './Hooks/UUIDHook'
import Country from './Country'

export const PRODUCT_STOCK_STATUS_OPTIONS = [
  'In Stock',
  'Out of Stock',
  'Made to Order',
  'Drop-shipped',
]

export type PRODUCT_STOCK_STATUS_TYPES =
  | 'In Stock'
  | 'Out of Stock'
  | 'Made to Order'
  | 'Drop-shipped'

export type PRODUCT_VISIBILITY_TYPES =
  | 'Catalogue Only'
  | 'Search Only'
  | 'Catalogue and Search'
  | 'Embedded'

export type PRODUCT_OWNERSHIP_TYPES = 'owner' | 'consumer'

export default class Product extends BaseModel {
  public static selfAssignPrimaryKey = true

  /**
   * Serialize the `$extras` object as it is
   */
  public serializeExtras = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public productTypeId: string

  @column()
  public attributeSetId: string

  @column()
  public name: string

  @column()
  @slugify({
    strategy: 'shortId',
    fields: ['name'],
  })
  public slug: string

  @column()
  public sku: string | null

  @column()
  public price: number

  @column()
  public isEnabled: boolean

  @column()
  public visibility: PRODUCT_VISIBILITY_TYPES

  @column()
  public stockStatus: PRODUCT_STOCK_STATUS_TYPES

  @column()
  public productHasWeight: boolean

  @column()
  public description: string | null

  @column()
  public shortDescription: string | null

  @column()
  public productImages: number

  @column()
  public weight: number | null

  @column()
  public countryOfManufacture: number | null

  @column()
  public activeFrom: DateTime

  @column()
  public activeTo: DateTime

  @column()
  public metaDescription: string | null

  @column()
  public metaKeywords: string | null

  @column()
  public metaRobots: string | null

  @column()
  public metaTitle: string | null

  @column()
  public minimumAdvertisedPrice: number | null

  @column()
  public displayActualPrice: boolean | null

  @column()
  public productNewFromDate: DateTime | null

  @column()
  public productNewToDate: DateTime | null

  @column()
  public seoName: string | null

  @column()
  public specialPrice: number | null

  @column()
  public specialPriceFromDate: DateTime | null

  @column()
  public specialPriceToDate: DateTime | null

  @column()
  public isForOneTimePurchase: boolean | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ProductType)
  public type: BelongsTo<typeof ProductType>

  @belongsTo(() => Country, { foreignKey: 'countryOfManufacture' })
  public country: BelongsTo<typeof Country>

  @belongsTo(() => AttributeSet)
  public attributeSet: BelongsTo<typeof AttributeSet>

  @manyToMany(() => ProductCategory, {
    pivotTimestamps: true,
  })
  public productCategories: ManyToMany<typeof ProductCategory>

  @manyToMany(() => Company, { pivotTimestamps: true, pivotColumns: ['ownership'] })
  public companies: ManyToMany<typeof Company>

  @beforeCreate()
  public static generateUUID(model: Product) {
    UUIDHook.generateUUID(model, 'id')
  }
}
