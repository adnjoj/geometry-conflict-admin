<script lang="ts">
  import { autorun } from 'mobx';
  import { Sveltik, Field, ErrorMessage } from 'sveltik';
  import { _ } from 'svelte-i18n';

  import {
    Form,
    FormRow,
    FormColumn,
    Input,
    Select,
    FileInput,
    ErrorField,
    Button,
    Checkbox,
  } from '../Form';

  import type { SkinType } from '../../types/entities/SkinType';
  import type { Fraction } from '../../types/entities/Fraction';

  import { skinTypesStore } from '../../core/mobx/entity-stores/SkinTypesStore';
  import { fractionsStore } from '../../core/mobx/entity-stores/FractionsStore';

  import { validate, fileInputs } from './form-config';

  export let formProps: {
    initialValues: any;
    onSubmit: (values: any) => any;
  };

  let skinTypes: SkinType[] = [];
  let fractions: Fraction[] = [];

  autorun(() => {
    skinTypes = skinTypesStore.skinTypes;
    fractions = fractionsStore.fractions;
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
        <label for="type-id-input">Тип скина:</label>
        <Field id="type-id-input" name="typeId" as={Select}>
          {#each skinTypes as { id, name }}
            <option value={id.toString()}>
              {$_(`skinTypes.${name}`)}
            </option>
          {/each}
        </Field>
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
      <p style="margin: 0;">Фракции, которым доступно оружие:</p>

      {#each fractions as { id, name }}
        <FormRow>
          <label for={`availableForFraction${id}`}>
            {$_(`fractions.${name}`)}
          </label>
          <Field
            id={`availableForFraction${id}`}
            name={`availableForFraction${id}`}
            as={Checkbox}
          />
        </FormRow>
      {/each}
    </FormColumn>
  </Form>
</Sveltik>
