import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { orderSelector } from '@/store/reducers/orders';
import { userService } from '@/services/user/user-service';
import { authService } from '@/services/auth/auth-service';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';


const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const router = useRouter()

  const onSubmit =  async(data: any) => {

    const dataLogin = {
      email: data.email,
      password: data.password,
    }


    
    try {
      await authService.login(dataLogin);      
      router.push("/home");
    } catch (err) {
      setErrorLogin('email ou senha inválida');
        setTimeout(() => {
          setErrorLogin('');
        }, 5000); 
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white border border-gray-300 rounded p-4 mb-4">

      <label htmlFor="email" className="block font-semibold text-gray-700">
        E-mail:
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          register={register('email', {required:'O email é obrigatório !'})}
        />
      </label>
      {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>)}

      <label htmlFor="password" className="block font-semibold text-gray-700 w-full">
        Senha:
        <div className="relative w-full">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            register={register('password', {required:'A senha é obrigatória !'})}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 h-full text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          >
            {showPassword ? (
              <EyeIcon className="h-5 w-5 m-0" />
            ) : (
              <EyeSlashIcon className="h-5 w-5 m-0 " />
            )}
          </button>
        </div>
      </label>
      {errors.password && (
            <p className="text-red-500">{`${errors.password.message}`}</p>
          )}
      <Button type='submit' >Entrar</Button>
      {errorLogin && (
        <div className='flex justify-center items-center'>
          <p className="text-red-500 text-sm mt-2">{errorLogin}</p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
