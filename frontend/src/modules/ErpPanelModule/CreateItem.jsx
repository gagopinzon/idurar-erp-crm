import { useState, useEffect } from 'react';

import { Button, Tag, Form, Divider } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import { useSelector, useDispatch } from 'react-redux';

import useLanguage from '@/locale/useLanguage';

import { settingsAction } from '@/redux/settings/actions';
import { erp } from '@/redux/erp/actions';
import { selectCreatedItem } from '@/redux/erp/selectors';

import calculate from '@/utils/calculate';
import { generate as uniqueId } from 'shortid';

import Loading from '@/components/Loading';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

function SaveForm({ form }) {
  const translate = useLanguage();
  const handelClick = () => {
    form.submit();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />}>
      {translate('Save')}
    </Button>
  );
}

export default function CreateItem({ config, CreateForm }) {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }));
  }, []);
  let { entity } = config;

  const { isLoading, isSuccess, result } = useSelector(selectCreatedItem);
  const [form] = Form.useForm();
  const [subTotal, setSubTotal] = useState(0);
  const [offerSubTotal, setOfferSubTotal] = useState(0);
  const handelValuesChange = (changedValues, values) => {
    console.log('🔄 handelValuesChange - changedValues:', changedValues);
    console.log('🔄 handelValuesChange - values:', values);
    
    const items = values['items'];
    let subTotal = 0;
    let subOfferTotal = 0;

    if (items) {
      console.log('📋 Items encontrados:', items);
      
      items.map((item, index) => {
        console.log(`📦 Item ${index}:`, item);
        
        // Solo procesar items que existen y tienen datos válidos
        if (item && item.productId) {
          if (item.offerPrice && item.quantity) {
            let offerTotal = calculate.multiply(item['quantity'], item['offerPrice']);
            subOfferTotal = calculate.add(subOfferTotal, offerTotal);
          }
          
          // Usar el campo total si existe, sino calcularlo
          if (item.total && item.total > 0) {
            console.log(`💰 Usando total del item ${index}:`, item.total);
            subTotal = calculate.add(subTotal, item.total);
          } else if (item.quantity && item.price) {
            let total = calculate.multiply(item['quantity'], item['price']);
            console.log(`🧮 Calculando total del item ${index}:`, total);
            subTotal = calculate.add(subTotal, total);
          }
        } else {
          console.log(`⚠️ Item ${index} ignorado (vacío o sin producto):`, item);
        }
      });
      
      console.log('📊 SubTotal calculado:', subTotal);
      setSubTotal(subTotal);
      setOfferSubTotal(subOfferTotal);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'create' }));
      setSubTotal(0);
      setOfferSubTotal(0);
      navigate(`/${entity.toLowerCase()}/read/${result._id}`);
    }
    return () => {};
  }, [isSuccess]);

  const onSubmit = (fieldsValue) => {
    console.log('🚀 ~ onSubmit ~ fieldsValue:', fieldsValue);
    if (fieldsValue) {
      if (fieldsValue.items) {
        // Filtrar items vacíos y calcular totales
        let newList = fieldsValue.items
          .filter(item => item && item.productId) // Solo items con producto seleccionado
          .map((item) => {
            // Asegurar que el total esté calculado
            if (item.quantity && item.price) {
              item.total = calculate.multiply(item.quantity, item.price);
            }
            return item;
          });
        
        fieldsValue = {
          ...fieldsValue,
          items: newList,
        };
        
        console.log('📤 Datos a enviar:', fieldsValue);
      }
    }
    dispatch(erp.create({ entity, jsonData: fieldsValue }));
  };

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        backIcon={<ArrowLeftOutlined />}
        title={translate('New')}
        ghost={false}
        tags={<Tag>{translate('Draft')}</Tag>}
        // subTitle="This is create page"
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => navigate(`/${entity.toLowerCase()}`)}
            icon={<CloseCircleOutlined />}
          >
            {translate('Cancel')}
          </Button>,
          <SaveForm form={form} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit} onValuesChange={handelValuesChange}>
          <CreateForm subTotal={subTotal} offerTotal={offerSubTotal} />
        </Form>
      </Loading>
    </>
  );
}
