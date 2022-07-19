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
    Checkbox,
    FileInput,
    ErrorField,
    Button,
  } from '../Form';

  import type { Speciality } from '../../types/entities/Speciality';
  import type { Clip } from '../../types/entities/Clip';
  import type { WeaponType } from '../../types/entities/WeaponType';

  import { specialitiesStore } from '../../core/mobx/entity-stores/SpecialitiesStore';
  import { weaponTypesStore } from '../../core/mobx/entity-stores/WeaponTypesStore';
  import { clipsStore } from '../../core/mobx/entity-stores/ClipsStore';

  import { validate, fileInputs } from './form-config';

  export let formProps: {
    initialValues: any;
    onSubmit: (values: any) => any;
  };

  let clips: Clip[];
  let weaponTypes: WeaponType[];
  let specialities: Speciality[];

  autorun(() => {
    clips = clipsStore.clips;
    weaponTypes = weaponTypesStore.weaponTypes;
    specialities = specialitiesStore.specialities;
  });
</script>

<Sveltik {...formProps} {validate} let:props>
  <Form on:submit={(event) => props.handleSubmit(event)}>
    <FormColumn>
      <FormRow>
        <label for="name-input"> Название: </label>
        <Field id="name-input" name="name" as={Input} autocomplete="off" />
        <ErrorMessage name="name" as={ErrorField} />
      </FormRow>

      <FormRow>
        <label for="type-id-input">Тип оружия:</label>
        <Field id="type-id-input" name="typeId" as={Select}>
          {#each weaponTypes as { id, name }}
            <option value={id.toString()}>
              {$_(`weaponTypes.${name}`)}
            </option>
          {/each}
        </Field>
      </FormRow>

      <FormRow>
        <label for="clip-id-input">Тип обоймы:</label>
        <Field id="clip-id-input" name="clipId" as={Select}>
          {#each clips as { id, name }}
            <option value={id.toString()}>{name}</option>
          {/each}
        </Field>
      </FormRow>

      <FormRow>
        <label for="damage-input">Урон:</label>
        <Field id="damage-input" name="damage" as={Input} autocomplete="off" />
        <ErrorMessage name="damage" as={ErrorField} />
      </FormRow>

      <FormRow>
        <label for="spread-input">Разброс (градусы):</label>
        <Field id="spread-input" name="spread" as={Input} autocomplete="off" />
        <ErrorMessage name="spread" as={ErrorField} />
      </FormRow>

      <FormRow>
        <label for="rate-of-fire-input"
          >Скорострельность (выстрелов / мин):</label
        >
        <Field
          id="rate-of-fire-input"
          name="rateOfFire"
          as={Input}
          autocomplete="off"
        />
        <ErrorMessage name="rateOfFire" as={ErrorField} />
      </FormRow>

      <FormRow>
        <label for="reload-speed-input">Скорость перезарядки (с):</label>
        <Field
          id="reload-speed-input"
          name="reloadSpeed"
          as={Input}
          autocomplete="off"
        />
        <ErrorMessage name="reloadSpeed" as={ErrorField} />
      </FormRow>

      <FormRow>
        <label for="firing-range-input">Дальнобойность (м):</label>
        <Field
          id="firing-range-input"
          name="firingRange"
          as={Input}
          autocomplete="off"
        />
        <ErrorMessage name="firingRange" as={ErrorField} />
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
      <p style="margin: 0;">Специальности, которым доступно оружие:</p>

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
