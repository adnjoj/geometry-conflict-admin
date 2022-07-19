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
  } from '../Form';

  import type { GameObjectType } from '../../types/entities/GameObjectType';
  import { gameObjectTypesStore } from '../../core/mobx/entity-stores/GameObjectTypesStore';

  import { validate, fileInputs } from './form-config';

  export let formProps: {
    initialValues: any;
    onSubmit: (values: any) => any;
  };

  let gameObjectTypes: GameObjectType[];

  autorun(() => {
    gameObjectTypes = gameObjectTypesStore.gameObjectTypes;
  });

  const hiddenTypes = [
    'Scene',
    'Group',
    'Point',
    'Path',
    'PlayerCollider',
    'UnshootableBulletCollider',
    'ShootableBulletCollider',
  ];
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
        <label for="type-id-input">Тип объекта:</label>
        <Field id="type-id-input" name="typeId" as={Select}>
          {#each gameObjectTypes as { id, name }}
            {#if !hiddenTypes.includes(name)}
              <option value={id.toString()}>
                {$_(`gameObjectTypes.${name}`)}
              </option>
            {/if}
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
  </Form>
</Sveltik>
