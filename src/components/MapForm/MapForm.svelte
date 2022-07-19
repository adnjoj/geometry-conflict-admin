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

  import type { Gamemode } from '../../types/entities/Gamemode';
  import { gamemodesStore } from '../../core/mobx/entity-stores/GamemodesStore';

  import { validate, fileInputs } from './form-config';

  export let formProps: {
    initialValues: any;
    onSubmit: (values: any) => any;
  };

  let gamemodes: Gamemode[];

  autorun(() => {
    gamemodes = gamemodesStore.gamemodes;
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
        <label for="gamemode-id-input">Режим:</label>
        <Field id="gamemode-id-input" name="gamemodeId" as={Select}>
          {#each gamemodes as { id, name }}
            <option value={id.toString()}>
              {$_(`gamemodes.${name}`)}
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
  </Form>
</Sveltik>
