
import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { userService } from '@/services/user/user-service';
import { useForm } from 'react-hook-form';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

const SignUpForm: React.FC = () => {
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

  const onSubmit = async (data: any) => {
    const user = {
      name:data.name,
      email:data.email,
      password:data.password,
    }
    try {
      await userService.create(user);
      setIsFormSubmitted(true);
      reset();
      setTimeout(() => {
        setIsFormSubmitted(false);
      }, 5000); 
    } catch (err) {
      alert(`Usuário inválido: ${err}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white border border-gray-300 p-4">
      <label className="block font-semibold text-gray-700">
        Nome de usuário:
        <Input type="text" placeholder='Digite seu nome' register={register('name', {required: 'Nome é obrigatório', minLength: {
          value: 8,
          message: 'A senha deve ter pelo menos 8 caracteres.'
        },
        maxLength: {
          value: 30,
          message: 'A senha não pode ter mais de 30 caracteres.'
        },})} />
      </label>
      {errors.name && (
            <p className="text-red-500">{`${errors.name.message}`}</p>
          )}
      <label className="block font-semibold text-gray-700">
        E-mail:
        <Input type="email" placeholder='Digite seu email' register={register('email', {required: 'E-mail é obrigatório'})} />
      </label>
      {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )}
      <label className="block font-semibold text-gray-700">
        Senha:
        <Input type="password" placeholder='Crie uma senha' register={register('password', {required: 'Senha é obrigatório', 
        minLength: {
          value: 8,
          message: 'A senha deve ter pelo menos 8 caracteres.'
        },
        maxLength: {
          value: 30,
          message: 'A senha não pode ter mais de 30 caracteres.'
        },
      validate: value => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]+$/;
        return regex.test(value) || 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.';
      }})} />
      </label>
      {errors.password && (
            <p className="text-red-500">{`${errors.password.message}`}</p>
          )}
      <Button type='submit'>Cadastrar</Button>
      {isFormSubmitted ? (
        <div className='flex w-full justify-center items-center mt-2'>
          <p className="text-blue-700 font-bold text-center mb-4 flex m-auto">
      Usuário criado com sucesso !
          <CheckBadgeIcon className='w-4 text-blue-700'/>
          </p>
        </div>
      ) : null}
    </form>
  );
};

export default SignUpForm;
