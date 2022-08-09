<template>
    <div class="dialog" v-if="show" @click.stop="hideDialog">
        <div class="dialog-content" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import toggleMain from '@/mixins/toggleMain';

    export default {
        name: 'my-dialog',
        mixins: [toggleMain]
    }
</script>

<style>
    .dialog {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        display: flex;
    }

    .dialog-content {
        margin: auto;
        background-color: white;
        border-radius: 12px;
        min-width: 400px;
        min-height: 50px;
        padding: 0px 60px 30px 30px;
    }
</style>