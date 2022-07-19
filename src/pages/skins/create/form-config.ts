import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';
import { navigate } from 'svelte-routing';
import { SkinsApiClient } from '../../../core/api-client/skins/SkinsApiClient';

import { fileInputs } from '../../../components/SkinForm/form-config';
import { skinsStore } from '../../../core/mobx/entity-stores/SkinsStore';

export function initializeForm() {
  const initialValues = {
    name: '',
    typeId: '1',
  };

  const onSubmit = async (values: { [key: string]: any }) => {
    const files = new FormData();
    const skinData = { ...values };

    fileInputs.forEach(({ name }) => {
      files.append(name, values[name]);
    });

    skinData.type = { id: parseInt(values.typeId, 10) };

    skinData.availableFractions = [];
    Object.entries(values).forEach(([key, value]) => {
      if (key.startsWith('availableForFraction') && value) {
        skinData.availableFractions.push({
          id: parseInt(key.substring('availableForFraction'.length), 10),
        });
      }
    });

    try {
      const createResponse = await SkinsApiClient.create(skinData);
      const createResponseJson = await createResponse.json();

      await SkinsApiClient.uploadFiles(createResponseJson.id, files);
    } catch (error) {
      return alert(error.message);
    }

    skinsStore.parseSkins();
    alert(get(_)('skin.Created'));

    navigate('/skins');
  };

  return { initialValues, onSubmit };
}
