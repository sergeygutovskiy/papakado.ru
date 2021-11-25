<template>
    <button 
        class="ordering-checkout-nav__item"
        :class="{ active: is_active }"
        >
        <slot />
    </button>
</template>

<script>
export default {
    props: [
        'is_active'
    ]
}
</script>