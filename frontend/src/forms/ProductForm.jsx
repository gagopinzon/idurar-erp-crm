import { Form, Input, InputNumber, Select, Switch } from 'antd';
import { CloseOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';

const { TextArea } = Input;

export default function ProductForm({ isUpdateForm = false }) {
  const translate = useLanguage();

  return (
    <>
      <Form.Item
        label={translate('SKU')}
        name="sku"
        rules={[
          {
            required: true,
            message: translate('Please input SKU'),
          },
        ]}
        tooltip="Código único del producto (se convertirá a mayúsculas automáticamente)"
      >
        <Input 
          placeholder="PROD-001" 
          style={{ textTransform: 'uppercase' }}
          maxLength={50}
        />
      </Form.Item>

      <Form.Item
        label={translate('Product Name')}
        name="name"
        rules={[
          {
            required: true,
            message: translate('Please input product name'),
          },
        ]}
      >
        <Input placeholder={translate('Product Name')} maxLength={200} />
      </Form.Item>

      <Form.Item
        label={translate('Description')}
        name="description"
      >
        <TextArea 
          rows={4} 
          placeholder={translate('Product description')}
          maxLength={1000}
        />
      </Form.Item>

      <Form.Item
        label={translate('Brand')}
        name="brand"
        tooltip="Selecciona una marca existente o crea una nueva"
      >
        <SelectAsync
          entity="productBrand"
          displayLabels={['name']}
          outputValue="name"
          withRedirect={true}
          urlToRedirect="/productBrand"
          redirectLabel="Añadir Marca"
        />
      </Form.Item>

      <Form.Item
        label={translate('Category')}
        name="category"
        tooltip="Selecciona una categoría existente o crea una nueva"
      >
        <SelectAsync
          entity="productCategory"
          displayLabels={['name']}
          outputValue="name"
          withRedirect={true}
          urlToRedirect="/productCategory"
          redirectLabel="Añadir Categoría"
        />
      </Form.Item>

      <Form.Item
        label={translate('Unit of Measure')}
        name="unit"
        rules={[
          {
            required: true,
            message: translate('Please select unit'),
          },
        ]}
        tooltip="Unidad en la que se vende o mide el producto"
      >
        <Select placeholder={translate('Select unit')}>
          <Select.Option value="piece">{translate('Piece')}</Select.Option>
          <Select.Option value="box">{translate('Box')}</Select.Option>
          <Select.Option value="kg">{translate('Kilogram')}</Select.Option>
          <Select.Option value="g">{translate('Gram')}</Select.Option>
          <Select.Option value="liter">{translate('Liter')}</Select.Option>
          <Select.Option value="ml">{translate('Milliliter')}</Select.Option>
          <Select.Option value="m">{translate('Meter')}</Select.Option>
          <Select.Option value="cm">{translate('Centimeter')}</Select.Option>
          <Select.Option value="m2">{translate('Square Meter')}</Select.Option>
          <Select.Option value="m3">{translate('Cubic Meter')}</Select.Option>
          <Select.Option value="set">{translate('Set')}</Select.Option>
          <Select.Option value="pack">{translate('Pack')}</Select.Option>
          <Select.Option value="dozen">{translate('Dozen')}</Select.Option>
          <Select.Option value="unit">{translate('Unit')}</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={translate('Inventory Quantity')}
        name="inventory"
        rules={[
          {
            required: true,
            message: translate('Please input inventory quantity'),
          },
        ]}
        tooltip="Cantidad actual en inventario"
      >
        <InputNumber 
          min={0}
          precision={2}
          style={{ width: '100%' }}
          placeholder="0"
        />
      </Form.Item>

      <Form.Item
        label={translate('Minimum Stock')}
        name="minStock"
        tooltip="Cantidad mínima de inventario antes de reordenar"
      >
        <InputNumber 
          min={0}
          precision={2}
          style={{ width: '100%' }}
          placeholder="0"
        />
      </Form.Item>

      <Form.Item
        label={translate('Sale Price')}
        name="price"
        rules={[
          {
            required: true,
            message: translate('Please input price'),
          },
        ]}
        tooltip="Precio de venta al público"
      >
        <InputNumber 
          min={0}
          precision={2}
          style={{ width: '100%' }}
          prefix="$"
          placeholder="0.00"
        />
      </Form.Item>

      <Form.Item
        label={translate('Cost Price')}
        name="cost"
        tooltip="Costo de adquisición del producto"
      >
        <InputNumber 
          min={0}
          precision={2}
          style={{ width: '100%' }}
          prefix="$"
          placeholder="0.00"
        />
      </Form.Item>

      <Form.Item
        label={translate('Barcode')}
        name="barcode"
        tooltip="Código de barras del producto"
      >
        <Input placeholder="7501234567890" maxLength={50} />
      </Form.Item>

      <Form.Item
        label={translate('Status')}
        name="status"
      >
        <Select placeholder={translate('Select status')}>
          <Select.Option value="active">{translate('Active')}</Select.Option>
          <Select.Option value="inactive">{translate('Inactive')}</Select.Option>
          <Select.Option value="discontinued">{translate('Discontinued')}</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={translate('Enabled')}
        name="enabled"
        valuePropName="checked"
      >
        <Switch 
          checkedChildren={<CheckOutlined />} 
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
    </>
  );
}

