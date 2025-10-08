import CrudModule from '@/modules/CrudModule/CrudModule';
import ProductBrandForm from '@/forms/ProductBrandForm';
import useLanguage from '@/locale/useLanguage';

export default function ProductBrand() {
  const translate = useLanguage();
  const entity = 'productBrand';
  
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name,country',
  };
  
  const deleteModalLabels = ['name'];

  const readColumns = [
    {
      title: translate('Brand Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Description'),
      dataIndex: 'description',
    },
    {
      title: translate('Website'),
      dataIndex: 'website',
    },
    {
      title: translate('Country'),
      dataIndex: 'country',
    },
    {
      title: translate('Enabled'),
      dataIndex: 'enabled',
    },
  ];

  const dataTableColumns = [
    {
      title: translate('Brand Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Country'),
      dataIndex: 'country',
    },
    {
      title: translate('Website'),
      dataIndex: 'website',
      render: (website) => {
        return website ? (
          <a href={website} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        ) : (
          '-'
        );
      },
    },
    {
      title: translate('Products Count'),
      dataIndex: 'productsCount',
      render: () => '-',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('brand'),
    DATATABLE_TITLE: translate('brand_list'),
    ADD_NEW_ENTITY: translate('add_new_brand'),
    ENTITY_NAME: translate('brand'),
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
      createForm={<ProductBrandForm />}
      updateForm={<ProductBrandForm isUpdateForm={true} />}
      config={config}
    />
  );
}

