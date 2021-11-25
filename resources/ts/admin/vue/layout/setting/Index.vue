<template>
    <div class="row">
        <div class="col-12">
            <card
                v-for="setting in settings"
                :key="setting.id"
                :setting="setting"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { computed } from "vue";

import { useStore } from "vuex";
import { ModuleTypes, namespace } from "../../../store";

import * as SettingModule from '../../../store/modules/setting';

import Card from "../../components/setting/Card.vue";

export default defineComponent({
    setup() {
        const store = useStore();

        const settings : SettingModule.Getter<SettingModule.GTypes.ITEMS> = computed(
            () => store.getters[ namespace(ModuleTypes.SETTING, SettingModule.GTypes.ITEMS) ]
        );

        const request_settings = () => store.dispatch(
            namespace(ModuleTypes.SETTING, SettingModule.ATypes.REQUEST_ITEMS)
        );
    
        return {
            settings,
            request_settings,
        }
    },

    components: {
        Card,
    },

    created() {
        if ( !this.settings.length ) this.request_settings();
    }
})
</script>
