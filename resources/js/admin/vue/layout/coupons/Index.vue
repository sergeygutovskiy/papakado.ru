<template>
    <section class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h1 class="mb-0"> Купоны </h1>
                    <router-link
                        :to="{ name: 'coupons-add' }"
                        class="btn btn-success"
                        >
                        Добавить
                    </router-link>
                </div>
            </div>
        </div>

        <div 
            class="col-4 d-flex align-items-stretch mb-4"
            v-for="coupon in coupons"
            :key="coupon.id"
            >
            <article class="card w-100">
                <ul class="list-group list-group-flush">
                    <li 
                        class="list-group-item d-flex justify-content-between align-items-start"
                        :class="{ 
                            'bg-success': coupon.is_active,
                            'bg-danger': !coupon.is_active, 
                        }">
                        <h4 class="text-white mb-0"> {{ coupon.name }} </h4>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold"> Код </div>
                            {{ coupon.value }}
                        </div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold"> Скидка </div>
                            {{ coupon.get_formatted_discount }}
                        </div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold"> Мин. стоимость заказа </div>
                            {{ coupon.get_formatted_min_order_cost }}
                        </div>
                    </li>
                </ul>
                <div class="card-footer d-flex">
                    <button 
                        class="btn btn-danger ms-auto"
                        @click="delete_coupon(coupon.id)"
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
            coupons: 'coupon/items'
        })
    },
    
    methods: {
        ...mapActions({
            get_coupons: 'coupon/get_items',
            _delete_coupon: 'coupon/delete_item',
            add_toast: 'app/add_toast'
        }),

        async delete_coupon(coupon) {
            await this._delete_coupon(coupon) 
        
            this.add_toast({ 
                text: `Купон удален`,
                style: 'bg-danger' 
            });
        }
    },

    created() {
        if ( !this.coupons.length ) this.get_coupons();
    }
}
</script>