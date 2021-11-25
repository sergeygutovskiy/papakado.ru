<template>
    <section class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h1 class="mb-0"> Баннеры </h1>
                    <router-link
                        :to="{ name: 'banners-add' }"
                        class="btn btn-success"
                        >
                        Добавить
                    </router-link>
                </div>
            </div>
        </div>

        <div 
            class="col-4 d-flex align-items-stretch mb-4"
            v-for="banner in banners"
            :key="banner.id"
            >
            <article class="card w-100">
                <img 
                    :src="banner.image_path" 
                    style="height: 200px; object-fit: cover;"
                    >
                <div class="card-body">
                    <div>
                        <strong> Порядок: </strong> {{ banner.order }}
                    </div>
                </div>
                <div class="card-footer d-flex">
                    <button
                        @click="delete_banner(banner.id)"
                        class="btn btn-danger ms-auto"
                        >
                        Удалить
                    </button>
                </div>
            </article>
        </div>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {    
    computed: {
        ...mapGetters({
            banners: 'banner/items'
        })
    },

    methods: {
        ...mapActions({
            _delete_banner: 'banner/delete_item',
            get_banners: 'banner/get_items',
            add_toast: 'app/add_toast'
        }),
    
        async delete_banner(banner) {
            await this._delete_banner(banner);

            this.add_toast({ 
                text: `Баннер удален`,
                style: 'bg-danger' 
            });
        }
    },

    created() {
        if ( !this.banners.length ) this.get_banners();
    }
}
</script>