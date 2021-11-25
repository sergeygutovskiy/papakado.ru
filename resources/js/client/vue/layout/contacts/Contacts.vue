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
        </dl>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            setting: 'app/setting_by_slug'
        })
    }
}
</script>