<template>
        <button :class="mode">
            <slot></slot>
        </button>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            required: false,
            default: null
        }
    }
}
</script>

<style scoped>

button {
    font-size: 1.5rem;
    padding: 10px;
    text-shadow: -3px 2px 3px black;
    border: 1px solid;
    border-radius: 5px;
}

.style-delete {
    background-color: rgb(179, 11, 11);
    color: white;
}

.style-edit {
    background-color: rgb(0, 179, 74);
    color: white;
}

.style-create {
    background-color: rgb(202, 202, 15);
    color: white;
}

</style>