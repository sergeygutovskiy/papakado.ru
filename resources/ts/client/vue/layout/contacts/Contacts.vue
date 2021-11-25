<template>
    <section>
        <header class="main-section__header">
            <h1 class="main-section__title">
                Контакты
            </h1>
        </header>

        <dl class="contacts-list list">
            <dt class="list__item-name"> Телефон </dt>
            <dd class="list__item-value"> 
                <a :href="'tel:' + setting('phone_value')">{{ setting('phone_text') }}</a> 
            </dd>

            <dt class="list__item-name"> E-mail </dt>
            <dd class="list__item-value">
                <a :href="'mailto:' + setting('email')">{{ setting('email') }}</a>
            </dd>

            <dt class="list__item-name"> Наименование юр.лица </dt>
            <dd class="list__item-value"> ИП Макарцов Руслан Рашидович </dd>

            <dt class="list__item-name"> ИНН </dt>
            <dd class="list__item-value"> 055052193227 </dd>
     
            <dt class="list__item-name"> Адрес ресторана </dt>
            <dd class="list__item-value"> СПб, Набережная Матисова канала, д.3 корпус 1 строение 1 </dd>

            <dt class="list__item-name"> Оплата на сайте происходит в </dt>
            <dd class="list__item-value"> ПАО Сбербанк </dd>

            <dt class="list__item-name"> Платежные системы </dt>
            <dd class="list__item-value"> 
                <div> Мир, Visa, MasterCard </div> 
                <img style="max-width: 100%; margin-top: 1em;" src="/images/payments.jpg">
            </dd>
        </dl>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core';
import { useStore } from 'vuex';

import { namespace, ModuleTypes } from '../../../store';
import * as AppModule from '../../../store/modules/app';

export default defineComponent({
    setup() {
        const store = useStore();
            
        const setting : AppModule.Getter<AppModule.GTypes.SETTING_BY_SLUG> = computed(
            () => store.getters[ namespace(ModuleTypes.APP, AppModule.GTypes.SETTING_BY_SLUG) ]
        );

        return {
            setting
        }
    },

    created() {
        const title : any = this.$route.meta.title;
        
        if ( title ) document.title = 'Papakado — ' + title;
        else document.title = 'Papakado';
    },
});
</script>