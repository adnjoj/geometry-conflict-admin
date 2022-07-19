<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Sveltik, Field, ErrorMessage } from 'sveltik';
  import { 
    Form, 
    FormRow, 
    FormColumn, 
    Input, 
    ErrorField,
    Button,
  } from '../../components/Form';

  import { initializeForm } from './form-config';

	const dispatch = createEventDispatcher();

  const formProps = initializeForm(() => {
    dispatch('login', {});
  });
</script>

<div class="login-form__wrapper">
  <div class="login-form">
    <Sveltik {...formProps} let:props>
      <Form on:submit={(event) => props.handleSubmit(event)}>
        <FormColumn>
          <FormRow>
            <h1 class="login-form__header">Вход в аккаунт</h1>
          </FormRow>

          <FormRow>
            <Field name="username" placeholder="Имя пользователя" as={Input} />
            <ErrorMessage name="username" as={ErrorField} />
          </FormRow>

          <FormRow>
            <Field name="password" type="password" placeholder="Пароль" as={Input} />
            <ErrorMessage name="password" as={ErrorField} />
          </FormRow>

          <FormRow>
            <Button type="submit">Войти</Button>
          </FormRow>
        </FormColumn>
      </Form>
    </Sveltik>
  </div>
</div>

<style lang="scss">
  @import './LoginForm.scss';
</style>