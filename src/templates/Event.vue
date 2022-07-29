<template>
    <Layout>
        <h1>{{$page.event.title}}</h1>
        <!-- <img :src="`http://localhost:1337${$page.event.image}`" alt=""> -->
        <!-- <img :src="`https://floating-bastion-34801.herokuapp.com${$page.event.image}`" alt=""> -->
        <img :src="$page.event.image" alt="">
        <p>{{$page.event.description}}</p>
    </Layout>
</template>

<page-query>
query($id: ID!) {
    event(id: $id) {
        id
        title
        description
        duration
        price
        date
        image
    }
}
</page-query>

<script>
export default {
    metaInfo() {
        return this.$page.event.title
    }
}
</script>