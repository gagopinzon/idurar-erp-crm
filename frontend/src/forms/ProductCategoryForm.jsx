import { Form, Input, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

const { TextArea } = Input;

export default function ProductCategoryForm({ isUpdateForm = false }) {
  const translate = useLanguage();

  return (
    <>
      <Form.Item
        label={translate('Category Name')}
        name="name"
        rules={[
          {
            required: true,
            message: translate('Please input category name'),
          },
        ]}
      >
        <Input placeholder={translate('Category Name')} maxLength={100} />
      </Form.Item>

      <Form.Item
        label={translate('Description')}
        name="description"
      >
        <TextArea 
          rows={3} 
          placeholder={translate('Category description')}
          maxLength={500}
        />
      </Form.Item>

      <Form.Item
        label={translate('Color')}
        name="color"
        tooltip="Color para identificar visualmente la categoría (ej: #FF5733)"
      >
        <Input 
          type="color"
          style={{ width: '100px', height: '40px' }}
        />
      </Form.Item>

      <Form.Item
        label={translate('Enabled')}
        name="enabled"
        valuePropName="checked"
        initialValue={true}
      >
        <Switch 
          checkedChildren={<CheckOutlined />} 
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
    </>
  );
}

