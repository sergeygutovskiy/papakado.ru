<template>
    <footer class="footer">
        <div class="footer__content container">
            <dl class="footer-terms">
                <dt class="footer-terms__title">
                    Адрес ресторана
                </dt>
                <dd class="footer-terms__description">
                    Санкт-Петербург, Набережная Матисова канала, 3 к1 ст1
                </dd>
                <dt class="footer-terms__title">
                    График работы
                </dt>
                <dd class="footer-terms__description">
                    {{ setting('schedule') }}
                </dd>
                <dt class="footer-terms__title">
                    По всем вопросам
                </dt>
                <dd class="footer-terms__description">
                    <a :href="'tel:' + setting('phone_value')">
                        {{ setting('phone_text') }}
                    </a>
                </dd>
            </dl>
            <div class="footer-social">
                <a class="footer-social__item inst" :href="setting('social_inst')"></a>
                <a class="footer-social__item vk" :href="setting('social_vk')"></a>
                <a class="footer-social__item fb" :href="setting('social_fb')"></a>
            </div>
            <div class="footer-company-info">
                <div class="footer-company-info__name">
                    «Papakado» © {{ new Date().getFullYear() }}
                </div>
                <div class="footer-company-info__developer">
                    Разработка сайта | <a href="https://terexov.agency/">terexov</a>
                </div>
            </div>
            <div class="footer-links">
                <router-link class="footer-links__item" :to="{ name: 'delivery' }">
                    Доставка
                </router-link>
                <router-link class="footer-links__item" :to="{ name: 'contacts' }">
                    Контакты
                </router-link>
                <router-link class="footer-links__item" :to="{ name: 'privacy' }">
                    Политика конфиденциальности
                </router-link>
            </div>
        </div>
    </footer>
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
    }        
});
</script>