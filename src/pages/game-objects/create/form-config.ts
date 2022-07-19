import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';
import { navigate } from 'svelte-routing';
import { GameObjectsApiClient } from '../../../core/api-client/game-objects/GameObjectsApiClient';

import { fileInputs } from '../../../components/GameObjectForm/form-config';
import { gameObjectsStore } from '../../../core/mobx/entity-stores/GameObjectsStore';

export function initializeForm() {
  const initialValues = {
    name: '',
    typeId: '1',
  };

  const onSubmit = async (values: { [key: string]: any }) => {
    const files = new FormData();
    const gameObjectData = { ...values };

    fileInputs.forEach(({ name }) => {
      files.append(name, values[name]);
    });

    gameObjectData.type = { id: parseInt(values.typeId, 10) };

    try {
      const createResponse = await GameObjectsApiClient.create(gameObjectData);
      const createResponseJson = await createResponse.json();

      await GameObjectsApiClient.uploadFiles(createResponseJson.id, files);
    } catch (error) {
      return alert(error.message);
    }

    gameObjectsStore.parseGameObjects();
    alert(get(_)('gameObject.Created'));

    navigate('/game-objects');
  };

  return { initialValues, onSubmit };
}
