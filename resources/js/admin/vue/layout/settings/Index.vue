<template>
    <div class="row">
        <div class="col-12">
            <div 
                class="card mb-4"
                v-for="setting in settings"
                :key="setting.id"
                >
                <div class="card-body">
                    <label class="form-label">
                        {{ setting.label }}
                    </label>
                    <div class="input-group">
                        <input class="form-control" type="text" v-model="setting.value">
                        <button class="btn btn-success" @click="update(setting)">
                            Обновить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            settings: 'setting/items'
        })
    },

    methods: {
        ...mapActions({
            get_settings: 'setting/get_items',
            update_setting: 'setting/update_item',
            add_toast: 'app/add_toast'
        }),

        async update(setting) {
            const form_data = new FormData();
            form_data.append('value', setting.value);

            await this.update_setting({ setting, form_data });
        
            this.add_toast({ 
                text: `Настройка <b>${setting.label}</b> обновлена`,
                style: 'bg-success' 
            });
        }
    },

    created() {
        if ( !this.settings.length ) this.get_settings();
    }
}
</script>