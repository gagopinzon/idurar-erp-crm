import { useState, useEffect } from 'react';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import { Select, Tag } from 'antd';
import { generate as uniqueId } from 'shortid';
import color from '@/utils/color';
import useLanguage from '@/locale/useLanguage';

const ProductSelector = ({
  value,
  onChange = () => {},
  onProductSelect = () => {},
  placeholder = 'Seleccionar producto',
}) => {
  const translate = useLanguage();
  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);

  const asyncList = () => {
    return request.list({ entity: 'product' });
  };
  
  const { result, isLoading: fetchIsLoading, isSuccess } = useFetch(asyncList);
  
  useEffect(() => {
    isSuccess && setOptions(result);
  }, [isSuccess]);

  const labels = (optionField) => {
    // Mostrar SKU y nombre del producto
    return `${optionField.sku} - ${optionField.name}`;
  };

  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  const handleSelectChange = (newValue) => {
    setCurrentValue(newValue);
    
    // Llamar onChange solo si está definido
    if (onChange && typeof onChange === 'function') {
      onChange(newValue);
    }
    
    // Encontrar el producto seleccionado y llamar al callback
    const selectedProduct = selectOptions.find(product => product._id === newValue);
    if (selectedProduct && onProductSelect) {
      onProductSelect(selectedProduct);
    }
  };

  const optionsList = () => {
    const list = [];

    selectOptions.map((optionField) => {
      const value = optionField._id;
      const label = labels(optionField);
      list.push({ value, label });
    });

    return list;
  };

  return (
    <Select
      loading={fetchIsLoading}
      disabled={fetchIsLoading}
      value={currentValue}
      onChange={handleSelectChange}
      placeholder={placeholder}
      showSearch
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      style={{ width: '100%' }}
    >
      {optionsList()?.map((option) => {
        return (
          <Select.Option key={`${uniqueId()}`} value={option.value}>
            {option.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default ProductSelector;
