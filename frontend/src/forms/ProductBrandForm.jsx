import { Form, Input, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

const { TextArea } = Input;

export default function ProductBrandForm({ isUpdateForm = false }) {
  const translate = useLanguage();

  return (
    <>
      <Form.Item
        label={translate('Brand Name')}
        name="name"
        rules={[
          {
            required: true,
            message: translate('Please input brand name'),
          },
        ]}
      >
        <Input placeholder={translate('Brand Name')} maxLength={100} />
      </Form.Item>

      <Form.Item
        label={translate('Description')}
        name="description"
      >
        <TextArea 
          rows={3} 
          placeholder={translate('Brand description')}
          maxLength={500}
        />
      </Form.Item>

      <Form.Item
        label={translate('Website')}
        name="website"
      >
        <Input 
          placeholder="https://www.example.com" 
          maxLength={200}
        />
      </Form.Item>

      <Form.Item
        label={translate('Country')}
        name="country"
        tooltip="País de origen de la marca"
      >
        <Input 
          placeholder={translate('Country')}
          maxLength={100}
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

