/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TableRow } from '../../../types/table';
import { stockStatusForSelect, yesNoOptionsForSelect } from 'src/helpers/utils';
import { ProductResultRowInterface, PRODUCT_TYPE } from 'src/store/types';

interface ProductHeaders extends TableRow {
  name: ProductColumns;
  field:
    | ProductColumns
    | ((row: ProductResultRowInterface) => PRODUCT_TYPE | undefined);
}

enum ProductColumns {
  id = 'id',
  product_type = 'product_type',
  name = 'name',
  sku = 'sku',
  price = 'price',
  is_enabled = 'is_enabled',
  stock_status = 'stock_status',
  product_has_weight = 'product_has_weight',
  created_at = 'created_at',
  updated_at = 'updated_at',
  slug = 'slug',
  weight = 'weight',
  country_of_manufacture = 'country_of_manufacture',
}

const columns: ProductHeaders[] = [
  {
    name: ProductColumns.id,
    required: false,
    label: 'Product ID',
    align: 'center',
    field: ProductColumns.id,
    filterable: true,
    filterInputType: 'text',
  },
  {
    name: ProductColumns.name,
    required: true,
    label: 'Name',
    align: 'center',
    field: ProductColumns.name,
    sortable: true,
    filterable: true,
    filterInputType: 'text',
  },
  {
    name: ProductColumns.product_type,
    required: true,
    label: 'Product Type',
    align: 'center',
    field: (row) => row?.meta?.product_type,
    sortable: true,
    filterable: true,
    filterInputType: 'text',
  },
  {
    name: ProductColumns.sku,
    required: true,
    label: 'SKU',
    align: 'center',
    field: ProductColumns.sku,
    sortable: true,
    filterable: true,
    filterInputType: 'text',
  },
  {
    name: ProductColumns.price,
    required: true,
    label: 'Price',
    align: 'center',
    field: ProductColumns.price,
    sortable: true,
    filterable: true,
    filterInputType: 'text',
  },
  {
    name: ProductColumns.is_enabled,
    required: true,
    label: 'Is Enabled',
    align: 'center',
    field: ProductColumns.is_enabled,
    sortable: true,
    filterable: true,
    filterInputType: 'select',
    filterOptions: yesNoOptionsForSelect.value,
  },
  {
    name: ProductColumns.stock_status,
    required: true,
    label: 'Stock Status',
    align: 'center',
    field: ProductColumns.stock_status,
    sortable: true,
    filterable: true,
    filterInputType: 'select',
    filterOptions: stockStatusForSelect.value,
  },
  {
    name: ProductColumns.product_has_weight,
    required: false,
    label: 'Product Has Weight',
    align: 'center',
    field: ProductColumns.product_has_weight,
    sortable: true,
    filterable: true,
    filterInputType: 'select',
    filterOptions: yesNoOptionsForSelect.value,
  },
  {
    name: ProductColumns.weight,
    required: false,
    label: 'Weight',
    align: 'center',
    field: ProductColumns.weight,
    sortable: true,
    filterable: true,
    filterInputType: 'text',
  },
  {
    name: ProductColumns.slug,
    required: false,
    label: 'Slug',
    align: 'center',
    field: ProductColumns.slug,
    sortable: false,
    filterable: false,
  },
  {
    name: ProductColumns.country_of_manufacture,
    required: false,
    label: 'Country of Manufacture',
    align: 'center',
    field: ProductColumns.country_of_manufacture,
    sortable: true,
    filterable: true,
    filterInputType: 'text',
  },
  {
    name: ProductColumns.created_at,
    required: false,
    label: 'Created At',
    align: 'center',
    field: ProductColumns.created_at,
    sortable: true,
    filterable: true,
    filterInputType: 'date',
  },
  {
    name: ProductColumns.updated_at,
    required: false,
    label: 'Updated At',
    align: 'center',
    field: ProductColumns.updated_at,
    sortable: true,
    filterable: true,
    filterInputType: 'date',
  },
];

export default columns;
