<script lang="ts">
  import { autorun } from 'mobx';
  import { Sveltik, Field, ErrorMessage } from 'sveltik';
  import { _ } from 'svelte-i18n';

  import {
    Form,
    FormRow,
    FormColumn,
    Input,
    Checkbox,
    FileInput,
    ErrorField,
    Button,
  } from '../Form';

  import type { Speciality } from '../../types/entities/Speciality';
  import { specialitiesStore } from '../../core/mobx/entity-stores/SpecialitiesStore';

  import { validate, fileInputs } from './form-config';

  export let formProps: {
    initialValues: any;
    onSubmit: (values: any) => any;
  };

  let specialities: Speciality[];

  autorun(() => {
    specialities = specialitiesStore.specialities;
  });
</script>

<Sveltik {...formProps} {validate} let:props>
  <Form on:submit={(event) => props.handleSubmit(event)}>
    <FormColumn>
      <FormRow>
        <label for="name-input">Название:</label>
        <Field id="name-input" name="name" as={Input} autocomplete="off" />
        <ErrorMessage name="name" as={ErrorField} />
      </FormRow>

      <FormRow>
        <label for="bullets-amount-input">Количество пуль:</label>
        <Field
          id="bullets-amount-input"
          name="bulletsAmount"
          as={Input}
          autocomplete="off"
        />
        <ErrorMessage name="bulletsAmount" as={ErrorField} />
      </FormRow>

      <FormRow>
        <label for="weight-input">Вес (кг):</label>
        <Field id="weight-input" name="weight" as={Input} autocomplete="off" />
        <ErrorMessage name="weight" as={ErrorField} />
      </FormRow>

      <FormRow>
        <Button type="submit">Сохранить</Button>
      </FormRow>
    </FormColumn>

    <FormColumn>
      {#each fileInputs as { name, accept, label }}
        <FormRow>
          <label for={`${name}Input`}>{label}</label>
          <Field id={`${name}Input`} {accept} {name} as={FileInput} />
        </FormRow>
      {/each}
    </FormColumn>

    <FormColumn>
      <p style="margin: 0;">Специальности, которым доступна обойма:</p>

      {#each specialities as { id, name }}
        <FormRow>
          <label for={`availableForSpeciality${id}`}>
            {$_(`specialities.${name}`)}
          </label>
          <Field
            id={`availableForSpeciality${id}`}
            name={`availableForSpeciality${id}`}
            as={Checkbox}
          />
        </FormRow>
      {/each}
    </FormColumn>
  </Form>
</Sveltik>
