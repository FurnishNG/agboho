import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product, { PRODUCT_STOCK_STATUS_TYPES } from 'App/Models/Product'
import ProductValidator from 'App/Validators/ProductValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProductsController {
  public async index({ response, request, bouncer, requestedCompany }: HttpContextContract) {
    await bouncer.with('ProductPolicy').authorize('list')

    if (requestedCompany) {
      const {
        page,
        descending,
        perPage,
        sortBy,
        id,
        product_type,
        name,
        sku,
        price,
        is_enabled,
        stock_status,
        product_has_weight,
        created_at,
        updated_at,
        slug,
        weight,
        country_of_manufacture,
      } = request.qs()

      const searchQuery = {
        id: id ?? null,
        product_type: product_type ?? null,
        name: name ?? null,
        sku: sku ?? null,
        price: price ?? null,
        is_enabled: is_enabled ?? null,
        stock_status: stock_status ?? null,
        product_has_weight: product_has_weight ?? null,
        created_at: created_at ?? null,
        updated_at: updated_at ?? null,
        slug: slug ?? null,
        weight: weight ?? null,
        country_of_manufacture: country_of_manufacture ?? null,
      }

      let subquery = requestedCompany
        .related('products')
        .query()
        .select(
          'products.id',
          'product_types.name as product_type',
          'products.name',
          'products.sku',
          'products.price',
          'products.is_enabled',
          'products.stock_status',
          'products.product_has_weight',
          'products.created_at',
          'products.updated_at',
          'products.slug',
          'products.weight',
          'countries.name as country_of_manufacture'
        )
        .leftJoin('product_types', (query) =>
          query.on('product_types.id', '=', 'products.product_type_id')
        )
        .leftJoin('countries', (query) =>
          query.on('countries.id', '=', 'products.country_of_manufacture')
        )

      if (sortBy) {
        subquery = subquery.orderBy(sortBy, descending === 'true' ? 'desc' : 'asc')
      }

      if (searchQuery) {
        subquery.where((query) => {
          for (const param in searchQuery) {
            if (Object.prototype.hasOwnProperty.call(searchQuery, param)) {
              let value = searchQuery[param]
              if (value) {
                if (value === 'true') value = true
                if (value === 'false') value = false

                if (param === 'country_of_manufacture') {
                  query.where('countries.name', value)
                } else if (param === 'product_type') {
                  query.where('product_types.name', value)
                } else {
                  query.where(`products.${param}`, value)
                  if (typeof value === 'string') {
                    query.orWhere(`products.${param}`, 'like', `%${value}%`)
                  }
                }
              }
            }
          }
        })
      }

      const products = await subquery.paginate(page ? page : 1, perPage ? perPage : 20)

      return response.ok({ data: products })
    }
  }

  public async store({ response, request, bouncer, requestedCompany }: HttpContextContract) {
    const {
      productTypeId,
      productName,
      sku,
      price,
      weight,
      countryOfManufacture,
      isEnabled,
      productHasWeight,
      stockStatus,
      description,
      shortDescription,
    } = await request.validate(ProductValidator)

    if (requestedCompany) {
      await bouncer.with('ProductPolicy').authorize('create')

      let newProduct: Product | null = null
      await Database.transaction(async (trx) => {
        requestedCompany.useTransaction(trx)
        newProduct = await requestedCompany?.related('products').create(
          {
            productTypeId,
            name: productName,
            sku,
            price,
            weight,
            countryOfManufacture,
            isEnabled,
            productHasWeight,
            stockStatus: stockStatus as PRODUCT_STOCK_STATUS_TYPES,
            description,
            shortDescription,
          },
          { ownership: 'owner' }
        )

        // TODO: implement products/company_product cache/clearing of cache

        return response.created({ data: newProduct?.id })
      })
    } else return response.abort({ message: 'Company not found' })
  }

  public async show({ response, requestedProduct, bouncer }: HttpContextContract) {
    if (requestedProduct) {
      // Check authorisation
      await bouncer.with('ProductPolicy').authorize('view', requestedProduct)

      await requestedProduct?.load('type')
      await requestedProduct?.load('country')
      await requestedProduct?.load('productCategories')

      const serialisedRequestedProduct = requestedProduct.serialize({
        fields: {
          pick: [
            'id',
            'product_type',
            'name',
            'sku',
            'price',
            'is_enabled',
            'stock_status',
            'product_has_weight',
            'created_at',
            'updated_at',
            'slug',
            'weight',
            'country_of_manufacture',
            'description',
            'short_description',
          ],
        },
        relations: {
          type: {
            fields: {
              pick: ['id', 'name'],
            },
          },
          country: {
            fields: {
              pick: ['id', 'name'],
            },
          },
          productCategories: {
            fields: {
              pick: ['name', 'id'],
            },
          },
        },
      })

      return response.ok({ data: serialisedRequestedProduct })
    }
  }

  public async update({ response, requestedProduct, bouncer, request }: HttpContextContract) {
    if (requestedProduct) {
      // Check authorisation
      await bouncer.with('ProductPolicy').authorize('edit', requestedProduct)

      const {
        productTypeId,
        productName,
        sku,
        price,
        weight,
        countryOfManufacture,
        isEnabled,
        productHasWeight,
        stockStatus,
        description,
        shortDescription,
      } = await request.validate(ProductValidator)

      requestedProduct.merge({
        productTypeId,
        name: productName,
        sku: sku ?? null,
        price,
        weight: weight ?? null,
        countryOfManufacture: countryOfManufacture ?? null,
        isEnabled,
        productHasWeight,
        stockStatus: stockStatus as PRODUCT_STOCK_STATUS_TYPES,
        description: description ?? null,
        shortDescription: shortDescription ?? null,
      })

      await requestedProduct.save()

      return response.ok({ data: requestedProduct.id })
    } else return response.abort('Requested Product not found')
  }

  public async productsForSelect({
    response,
    requestedCompany,
    request,
    bouncer,
  }: HttpContextContract) {
    await bouncer.with('ProductPolicy').authorize('list')

    const { query } = request.qs()

    const searchedProducts = await requestedCompany
      ?.related('products')
      .query()
      .where(function (whereQuery) {
        whereQuery.whereRaw(`products.name LIKE '%${query}%'`)
      })
      .orderBy('products.name', 'asc')

    const transformedSearchedProducts = searchedProducts?.map((product) => {
      const serialisedProduct = product.serialize()
      return {
        label: serialisedProduct.name,
        value: serialisedProduct.id,
      }
    })

    return response.ok({ data: transformedSearchedProducts })
  }

  public async destroy({}: HttpContextContract) {}
}
