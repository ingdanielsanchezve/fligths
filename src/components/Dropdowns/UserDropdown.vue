<template>
  <div>
    <a
      class="text-blueGray-500 block"
      href="#daniel"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="..."
            class="w-full rounded-full align-middle border-none shadow-lg"
            :src="image"
          />
        </span>
      </div>
    </a>
  </div>
</template>

<script>
import image from "@/assets/img/avatar.png";

export default {
  data() {
    return {
      image: image,
    };
  }
};
</script>
