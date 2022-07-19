import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';
import { navigate } from 'svelte-routing';
import { WeaponsApiClient } from '../../../core/api-client/weapons/WeaponsApiClient';

import { fileInputs } from '../../../components/WeaponForm/form-config';
import { weaponsStore } from '../../../core/mobx/entity-stores/WeaponsStore';

export function initializeForm() {
  const initialValues = {
    name: '',
    typeId: '1',
    clipId: '1',
    damage: 0,
    spread: 0,
    rateOfFire: 0,
    reloadSpeed: 0,
    firingRange: 0,
    weight: 0,
  };

  const onSubmit = async (values: { [key: string]: any }) => {
    const files = new FormData();
    const weaponData = { ...values };

    fileInputs.forEach(({ name }) => {
      files.append(name, values[name]);
    });

    weaponData.type = { id: parseInt(values.typeId, 10) };
    weaponData.clip = { id: parseInt(values.clipId, 10) };

    weaponData.availableSpecialities = [];
    Object.entries(values).forEach(([key, value]) => {
      if (key.startsWith('availableForSpeciality') && value) {
        weaponData.availableSpecialities.push({
          id: parseInt(key.substring('availableForSpeciality'.length), 10),
        });
      }
    });

    try {
      const createResponse = await WeaponsApiClient.create(weaponData);
      const createResponseJson = await createResponse.json();

      await WeaponsApiClient.uploadFiles(createResponseJson.id, files);
    } catch (error) {
      return alert(error.message);
    }

    weaponsStore.parseWeapons();
    alert(get(_)('weapon.Created'));

    navigate('/weapons');
  };

  return { initialValues, onSubmit };
}
