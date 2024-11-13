<template>
    <div class="navbar h-[80px]">
        <h1 class="title text-2xl font-bold">Loans</h1>
    </div>
    <main>
        <div class="container m-0 my-10">
            <slot />
        </div>
    </main>
</template>

<style scoped>
.navbar{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(16, 13, 53);
    color:rgb(199, 217, 31);
    width: 100%;
}
</style>