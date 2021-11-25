<template>
    <article class="card mb-4">
        <div class="card-body">
            <label class="form-label">
                {{ setting.label }}
            </label>
            <div class="input-group">
                <input class="form-control" type="text" v-model="setting.value">
                <button class="btn btn-success" @click="update">
                    Обновить
                </button>
            </div>
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import { useStore } from "vuex";
import Setting from "../../../classes/Setting";
import { ModuleTypes, namespace } from "../../../store";

import * as SettingModule from '../../../store/modules/setting';
import * as AppModule from '../../../store/modules/app';

import Toast from "../../../classes/Toast";

export default defineComponent({
    props: {
        setting: {
            type: Setting,
            required: true,
        }
    },
    
    setup() {
        const store = useStore();


        const update_setting = ({ id, data } : { id: number, data: FormData }) => store.dispatch(
            namespace(ModuleTypes.SETTING, SettingModule.ATypes.UPDATE_ITEM), { id, data }
        );
    
        const add_toast = (toast: Toast) => store.dispatch(
            namespace(ModuleTypes.APP, AppModule.ATypes.STORE_TOAST), toast
        );

        return {
            update_setting,
            add_toast,
        }
    },


    methods: {
        async update() {
            const form_data = new FormData();
            form_data.append('value', this.setting.value);

            await this.update_setting({ id: this.setting.id, data: form_data });
        
            this.add_toast(new Toast({ 
                text: `Настройка <b>${this.setting.label}</b> обновлена`,
                style: 'bg-success' 
            }));
        }
    }
})
</script>
