import React, { FC, FormEvent, ReactElement, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthorizationStore } from '../../store/hooks';
import { inputChangeHandler } from '../../utils/inputChangeHandler';
import { observer } from 'mobx-react-lite';
import { ProtectedRoutes, PublicRoutes } from '../../Router';

const SignUp: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await authorizationStore.singUpEmailAndPassword(email, password);
      navigate(ProtectedRoutes.COLLECTIONS);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div>
      <p>Sign Up</p>

      <form onSubmit={(e) => submitHandler(e)}>
        <input value={email} onChange={(e) => inputChangeHandler(e, setEmail)} name={'email'} type="email" autoFocus/>
        <input value={password} onChange={(e) => inputChangeHandler(e, setPassword)} name={'password'} type="password"/>

        <p>{`I already have an account.`}</p>
        <Link to={PublicRoutes.SIGN_IN}>Sign In</Link>

        <button type={'submit'}>Submit</button>
      </form>
    </div>
  );
});

export default SignUp;