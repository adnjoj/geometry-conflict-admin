import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';
import { navigate } from 'svelte-routing';
import { ClipsApiClient } from '../../../core/api-client/clips/ClipsApiClient';

import { fileInputs } from '../../../components/ClipForm/form-config';
import { clipsStore } from '../../../core/mobx/entity-stores/ClipsStore';

export function initializeForm() {
  const initialValues = {
    name: '',
    bulletsAmount: 0,
    weight: 0,
  };

  const onSubmit = async (values: { [key: string]: any }) => {
    const files = new FormData();
    const clipData = { ...values };

    fileInputs.forEach(({ name }) => {
      files.append(name, values[name]);
    });

    clipData.availableSpecialities = [];
    Object.entries(values).forEach(([key, value]) => {
      if (key.startsWith('availableForSpeciality') && value) {
        clipData.availableSpecialities.push({
          id: parseInt(key.substring('availableForSpeciality'.length), 10),
        });
      }
    });

    try {
      const createResponse = await ClipsApiClient.create(clipData);
      const createResponseJson = await createResponse.json();

      await ClipsApiClient.uploadFiles(createResponseJson.id, files);
    } catch (error) {
      return alert(error.message);
    }

    clipsStore.parseClips();
    alert(get(_)('clip.Created'));

    navigate('/clips');
  };

  return { initialValues, onSubmit };
}
