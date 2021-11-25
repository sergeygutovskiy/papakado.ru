<template>
    <button 
        class="ordering-checkout-nav__item"
        :class="{ active: is_active }"
        >
        <slot />
    </button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    props: {
        is_active: {
            type: Boolean,
            required: true,
        }
    }
});
</script>