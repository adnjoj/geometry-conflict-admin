import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';
import { navigate } from 'svelte-routing';
import { MapsApiClient } from '../../../core/api-client/maps/MapsApiClient';

import { fileInputs } from '../../../components/MapForm/form-config';
import { mapsStore } from '../../../core/mobx/entity-stores/MapsStore';

export function initializeForm() {
  const initialValues = {
    name: '',
    gamemodeId: '1',
  };

  const onSubmit = async (values: { [key: string]: any }) => {
    const files = new FormData();
    const mapData = { ...values };

    fileInputs.forEach(({ name }) => {
      files.append(name, values[name]);
    });

    mapData.gamemode = { id: parseInt(values.gamemodeId, 10) };

    try {
      const createResponse = await MapsApiClient.create(mapData);
      const createResponseJson = await createResponse.json();

      await MapsApiClient.uploadFiles(createResponseJson.id, files);
    } catch (error) {
      return alert(error.message);
    }

    mapsStore.parseMaps();
    alert(get(_)('map.Created'));

    navigate('/maps');
  };

  return { initialValues, onSubmit };
}
