<template>
  <div>
    <v-list></v-list>
    <v-form></v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";

export default {
  components: {
    vList,
    vForm
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
  },
  mounted() {}
};
</script>

<style scoped></style>
