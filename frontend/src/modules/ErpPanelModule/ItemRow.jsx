import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col, Tag, Tooltip } from 'antd';

import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useMoney, useDate } from '@/settings';
import calculate from '@/utils/calculate';
import ProductSelector from '@/components/ProductSelector';

export default function ItemRow({ field, remove, current = null }) {
  const [totalState, setTotal] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const money = useMoney();
  const form = Form.useFormInstance();
  
  const updateQt = (value) => {
    setQuantity(value);
  };
  const updatePrice = (value) => {
    setPrice(value);
  };

  const handleProductSelect = (product) => {
    console.log('Producto seleccionado:', product);
    setSelectedProduct(product);
    
    if (product) {
      const productPrice = product.price || 0;
      const productDescription = product.description || '';
      
      // Actualizar el estado local
      setPrice(productPrice);
      
      // Obtener la cantidad actual
      const currentQuantity = form.getFieldValue([field.name, 'quantity']) || 0;
      const newTotal = calculate.multiply(currentQuantity, productPrice);
      
      // Obtener todos los items actuales
      const currentItems = form.getFieldValue('items') || [];
      const newItems = [...currentItems];
      
      // Actualizar el item específico
      newItems[field.name] = {
        ...newItems[field.name],
        price: productPrice,
        description: productDescription,
        itemName: product.name,
        productId: product._id,
        sku: product.sku || '',
        brand: product.brand || '',
        category: product.category || '',
        unit: product.unit || 'piece',
        inventory: product.inventory || 0,
        cost: product.cost || 0,
        barcode: product.barcode || '',
        quantity: currentQuantity,
        total: newTotal
      };
      
      // Actualizar todo el array de items para disparar onValuesChange
      form.setFieldsValue({ items: newItems });
      
      // Actualizar el total local
      setTotal(newTotal);
      
      console.log('✅ Producto y precio actualizados:', {
        itemName: product.name,
        description: productDescription,
        price: productPrice,
        quantity: currentQuantity,
        total: newTotal
      });
    }
  };

  useEffect(() => {
    if (current) {
      // When it accesses the /payment/ endpoint,
      // it receives an invoice.item instead of just item
      // and breaks the code, but now we can check if items exists,
      // and if it doesn't we can access invoice.items.

      const { items, invoice } = current;

      if (invoice) {
        const item = invoice[field.fieldKey];

        if (item) {
          setQuantity(item.quantity);
          setPrice(item.price);
        }
      } else {
        const item = items[field.fieldKey];

        if (item) {
          setQuantity(item.quantity);
          setPrice(item.price);
        }
      }
    }
  }, [current]);

  useEffect(() => {
    const currentTotal = calculate.multiply(price, quantity);

    setTotal(currentTotal);
    
    // Actualizar el campo total en el formulario usando setFieldValue
    form.setFieldValue([field.name, 'total'], currentTotal);
  }, [price, quantity, field.name, form]);

  // Efecto para sincronizar valores del formulario con el estado local
  useEffect(() => {
    const currentValues = form.getFieldsValue();
    const items = currentValues.items || [];
    const currentItem = items[field.name];
    
    if (currentItem) {
      // Sincronizar estado local
      if (currentItem.price !== undefined) {
        setPrice(currentItem.price);
      }
      if (currentItem.quantity !== undefined) {
        setQuantity(currentItem.quantity);
      }
    }
  }, [form, field.name]);

  // Efecto para forzar la actualización visual de los campos
  useEffect(() => {
    if (selectedProduct) {
      // Múltiples intentos de actualización
      const timeouts = [];
      
      // Actualización inmediata
      timeouts.push(setTimeout(() => {
        const currentValues = form.getFieldsValue();
        const items = currentValues.items || [];
        const currentItem = items[field.name];
        
        if (currentItem && currentItem.productId) {
          form.setFieldValue([field.name, 'description'], currentItem.description || '');
          form.setFieldValue([field.name, 'price'], currentItem.price || 0);
        }
      }, 100));
      
      // Actualización después de 500ms
      timeouts.push(setTimeout(() => {
        const currentValues = form.getFieldsValue();
        const items = currentValues.items || [];
        const currentItem = items[field.name];
        
        if (currentItem && currentItem.productId) {
          form.setFieldValue([field.name, 'description'], currentItem.description || '');
          form.setFieldValue([field.name, 'price'], currentItem.price || 0);
        }
      }, 500));
      
      // Actualización después de 1 segundo
      timeouts.push(setTimeout(() => {
        const currentValues = form.getFieldsValue();
        const items = currentValues.items || [];
        const currentItem = items[field.name];
        
        if (currentItem && currentItem.productId) {
          form.setFieldValue([field.name, 'description'], currentItem.description || '');
          form.setFieldValue([field.name, 'price'], currentItem.price || 0);
        }
      }, 1000));
      
      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }
  }, [selectedProduct, form, field.name]);

  return (
    <Row gutter={[12, 12]} style={{ position: 'relative' }}>
      <Col className="gutter-row" span={5}>
        <Form.Item
          name={[field.name, 'productId']}
          rules={[
            {
              required: true,
              message: 'Selecciona un producto',
            },
          ]}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ProductSelector
              placeholder="Seleccionar producto"
              onProductSelect={handleProductSelect}
            />
            {selectedProduct && (
              <Tag color="green" icon={<CheckCircleOutlined />}>
                Producto seleccionado
              </Tag>
            )}
          </div>
        </Form.Item>
        {/* Campos ocultos para mantener compatibilidad y almacenar datos adicionales */}
        <Form.Item name={[field.name, 'itemName']} style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item name={[field.name, 'sku']} style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item name={[field.name, 'brand']} style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item name={[field.name, 'category']} style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item name={[field.name, 'unit']} style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item name={[field.name, 'inventory']} style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item name={[field.name, 'cost']} style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item name={[field.name, 'barcode']} style={{ display: 'none' }}>
          <Input />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={7}>
        <Form.Item shouldUpdate={(prevValues, currentValues) => {
          const prevItem = prevValues.items?.[field.name];
          const currentItem = currentValues.items?.[field.name];
          return prevItem?.description !== currentItem?.description;
        }}>
          {({ getFieldValue }) => {
            const description = getFieldValue(['items', field.name, 'description']);
            return (
              <Form.Item 
                name={[field.name, 'description']}
              >
                <Tooltip 
                  title={selectedProduct ? "Descripción del producto seleccionado (no editable)" : "Ingresa la descripción del artículo"}
                  placement="top"
                >
                  <Input 
                    placeholder="Descripción del producto" 
                    readOnly={selectedProduct !== null}
                    value={description || ''}
                    style={{ 
                      backgroundColor: selectedProduct ? '#f5f5f5' : 'white',
                      cursor: selectedProduct ? 'not-allowed' : 'text'
                    }}
                  />
                </Tooltip>
              </Form.Item>
            );
          }}
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={3}>
        <Form.Item name={[field.name, 'quantity']} rules={[{ required: true }]}>
          <InputNumber 
            style={{ width: '100%' }} 
            min={0} 
            onChange={updateQt}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={4}>
        <Form.Item shouldUpdate={(prevValues, currentValues) => {
          const prevItem = prevValues.items?.[field.name];
          const currentItem = currentValues.items?.[field.name];
          return prevItem?.price !== currentItem?.price;
        }}>
          {({ getFieldValue }) => {
            const price = getFieldValue(['items', field.name, 'price']);
            return (
              <Form.Item 
                name={[field.name, 'price']} 
                rules={[{ required: true }]}
              >
                <Tooltip 
                  title={selectedProduct ? "Precio unitario del producto seleccionado (no editable)" : "Ingresa el precio unitario del artículo"}
                  placement="top"
                >
                  <InputNumber
                    className="moneyInput"
                    onChange={updatePrice}
                    min={0}
                    controls={false}
                    readOnly={selectedProduct !== null}
                    value={price || 0}
                    style={{ 
                      width: '100%',
                      backgroundColor: selectedProduct ? '#f5f5f5' : 'white',
                      cursor: selectedProduct ? 'not-allowed' : 'text'
                    }}
                    addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
                    addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
                  />
                </Tooltip>
              </Form.Item>
            );
          }}
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={5}>
        <Form.Item name={[field.name, 'total']}>
          <Form.Item>
            <InputNumber
              readOnly
              className="moneyInput"
              value={totalState}
              min={0}
              controls={false}
              addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
              addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
              formatter={(value) =>
                money.amountFormatter({ amount: value, currency_code: money.currency_code })
              }
            />
          </Form.Item>
        </Form.Item>
      </Col>

      <div style={{ position: 'absolute', right: '-20px', top: ' 5px' }}>
        <DeleteOutlined onClick={() => remove(field.name)} />
      </div>
    </Row>
  );
}
