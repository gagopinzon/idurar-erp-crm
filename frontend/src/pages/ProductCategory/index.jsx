import CrudModule from '@/modules/CrudModule/CrudModule';
import ProductCategoryForm from '@/forms/ProductCategoryForm';
import useLanguage from '@/locale/useLanguage';
import { Tag } from 'antd';

export default function ProductCategory() {
  const translate = useLanguage();
  const entity = 'productCategory';
  
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  
  const deleteModalLabels = ['name'];

  const readColumns = [
    {
      title: translate('Category Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Description'),
      dataIndex: 'description',
    },
    {
      title: translate('Color'),
      dataIndex: 'color',
    },
    {
      title: translate('Enabled'),
      dataIndex: 'enabled',
    },
  ];

  const dataTableColumns = [
    {
      title: translate('Category Name'),
      dataIndex: 'name',
      render: (name, record) => {
        return record.color ? (
          <Tag color={record.color}>{name}</Tag>
        ) : (
          <span>{name}</span>
        );
      },
    },
    {
      title: translate('Description'),
      dataIndex: 'description',
    },
    {
      title: translate('Products Count'),
      dataIndex: 'productsCount',
      render: () => '-',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('product_category'),
    DATATABLE_TITLE: translate('product_category_list'),
    ADD_NEW_ENTITY: translate('add_new_product_category'),
    ENTITY_NAME: translate('product_category'),
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
      createForm={<ProductCategoryForm />}
      updateForm={<ProductCategoryForm isUpdateForm={true} />}
      config={config}
    />
  );
}

