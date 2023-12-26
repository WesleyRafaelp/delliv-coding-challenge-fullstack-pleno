import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { newOrder, orderSelector } from '@/store/reducers/orders';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useForm } from 'react-hook-form';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

const OrderForm: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(orderSelector)

  const onSubmit = (data:any) => {

    const dataOrder = {
      client: data.client,
      deliveryAddress: `${data.street}, ${data.number} - ${data.neighborhood}`,
    }
    try {
      dispatch(newOrder(dataOrder));
      setIsFormSubmitted(true);
      reset();
      setTimeout(() => {
        setIsFormSubmitted(false);
      }, 5000); 
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white border border-gray-300 rounded p-4 mb-4">
      <label className="block font-semibold text-gray-700">
        Cliente:
        <Input type="text" placeholder='Digite o nome do cliente' register={register('client', {required: 'Nome do cliente é obrigatório',
        minLength: {
          value: 3,
          message: 'O nome do cliente deve ter pelo menos 3 caracteres.'
        },})} />
      </label>
      {errors.client && (
            <p className="text-red-500">{`${errors.client.message}`}</p>
          )}
      <label className="block font-semibold text-gray-700">
        Rua:        <Input type="text" placeholder='Digite o nome da rua' register={register('street', {required: 'Nome da rua é obrigatório',
        })} />
      </label>
      {errors.street && (
            <p className="text-red-500">{`${errors.street.message}`}</p>
          )}
      <label className="block font-semibold text-gray-700">
        Número :       <Input type="text" placeholder='Digite o número do local' inputMode='numeric'  register={register('number', {required: 'Número residencial é obrigatório', pattern: {
          value: /^\d+$/,
          message: 'Digite apenas números no campo de número.'
        },})} />
      </label>
      {errors.number && (
            <p className="text-red-500">{`${errors.number.message}`}</p>
          )}
      <label className="block font-semibold text-gray-700">
        Bairro :       <Input type="text" placeholder='Digite o nome do bairro' register={register('neighborhood', {required: 'Bairro é obrigatório'})} />
      </label>
      {errors.neighborhood && (
            <p className="text-red-500">{`${errors.neighborhood.message}`}</p>
          )}
      {
        loading ? (<button type="button" className="w-10 h-10" disabled >
          <svg className="animate-spin h-8 w-8 m-auto border-t-2 border-gray rounded-full" viewBox="0 0 24 24"></svg>
        </button>) : (<Button type='submit'>Criar Pedido</Button>)
      }
      {error ? (
        <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mb-4" role="alert" data-testid="error-message">
          <div className="flex">
            <div className="py-1">
              <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M10 2C5.82 2 2 5.82 2 10s3.82 8 8 8 8-3.82 8-8-3.82-8-8-8zm1 12h-2v-2h2v2zm0-4h-2V6h2v4z"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold" >Error: {error}</p>
            </div>
          </div>
        </div>
      ): null}
      {isFormSubmitted ? (
        <div className='flex w-full justify-center items-center mt-2'>
          <p className="text-blue-700 font-bold text-center mb-4 flex m-auto">
          Pedido criado com sucesso!
          <CheckBadgeIcon className='w-4 text-blue-700'/>
          </p>
        </div>
      ) : null}
    </form>
  );
};

export default OrderForm;
