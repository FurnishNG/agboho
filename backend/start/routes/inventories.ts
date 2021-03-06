import Route from '@ioc:Adonis/Core/Route'

// General Authenticated routes for inventory-related requests
Route.group(() => {
  // Get all product types for selections
  Route.get(
    '/product-types/product-types-for-select',
    'ProductTypesController.productTypesForSelect'
  )
  // Get all attribute sets for selections
  Route.get(
    '/attribute-sets/attribute-sets-for-select',
    'AttributeSetsController.attributeSetsForSelect'
  )
  // Get details of the requested product
  Route.get('/products/:product_id', 'ProductsController.show').middleware('findRequestedProduct')
  // Get details of the requested product
  Route.patch('/products/:product_id', 'ProductsController.update').middleware(
    'findRequestedProduct'
  )
})
  .prefix('/v1')
  .middleware('auth')
  .middleware('findAuthRole')

// General Authenticated routes for inventory-related requests
Route.group(() => {
  // Get all attribute set data
  Route.get(
    '/:company_id/attribute-sets/:type/:attribute_set_id',
    'AttributeSetsController.attributeSetData'
  ).middleware('findRequestedAttributeSet')

  // Create a new product and relate with to the company_id
  Route.post('/:company_id/products', 'ProductsController.store')

  // Fetch all products for the company_id
  Route.get('/:company_id/products', 'ProductsController.index')

  // Fetch products for the company_id for selection
  Route.get('/:company_id/products-for-select', 'ProductsController.productsForSelect')
})
  .prefix('/v1')
  .middleware('auth')
  .middleware('findAuthRole')
  .middleware('findRequestedCompany')
