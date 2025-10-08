import CrudModule from '@/modules/CrudModule/CrudModule';
import ProductForm from '@/forms/ProductForm';
import useLanguage from '@/locale/useLanguage';

export default function Product() {
  const translate = useLanguage();
  const entity = 'product';
  
  const searchConfig = {
    displayLabels: ['name', 'sku'],
    searchFields: 'name,sku,brand',
  };
  
  const deleteModalLabels = ['name', 'sku'];

  const readColumns = [
    {
      title: translate('SKU'),
      dataIndex: 'sku',
    },
    {
      title: translate('Product Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Description'),
      dataIndex: 'description',
    },
    {
      title: translate('Brand'),
      dataIndex: 'brand',
    },
    {
      title: translate('Category'),
      dataIndex: 'category',
    },
    {
      title: translate('Unit of Measure'),
      dataIndex: 'unit',
    },
    {
      title: translate('Inventory Quantity'),
      dataIndex: 'inventory',
    },
    {
      title: translate('Minimum Stock'),
      dataIndex: 'minStock',
    },
    {
      title: translate('Sale Price'),
      dataIndex: 'price',
    },
    {
      title: translate('Cost Price'),
      dataIndex: 'cost',
    },
    {
      title: translate('Barcode'),
      dataIndex: 'barcode',
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
    {
      title: translate('Enabled'),
      dataIndex: 'enabled',
    },
  ];

  const dataTableColumns = [
    {
      title: translate('SKU'),
      dataIndex: 'sku',
    },
    {
      title: translate('Product Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Brand'),
      dataIndex: 'brand',
    },
    {
      title: translate('Unit'),
      dataIndex: 'unit',
      render: (unit) => translate(unit || 'unit'),
    },
    {
      title: translate('Inventory'),
      dataIndex: 'inventory',
    },
    {
      title: translate('Price'),
      dataIndex: 'price',
      render: (price) => {
        return price ? `$${parseFloat(price).toFixed(2)}` : '$0.00';
      },
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        return translate(status || 'active');
      },
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('product'),
    DATATABLE_TITLE: translate('product_list'),
    ADD_NEW_ENTITY: translate('add_new_product'),
    ENTITY_NAME: translate('product'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    readColumns,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };

  return (
    <CrudModule
      createForm={<ProductForm />}
      updateForm={<ProductForm isUpdateForm={true} />}
      config={config}
    />
  );
}

