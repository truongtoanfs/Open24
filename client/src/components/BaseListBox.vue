<template>
    <Listbox as="div" class="relative" v-model="selectedItem">
        <ListboxButton as="div" class="relative">
            <input type="text" class="input" :value="selectedItem.name" :placeholder="placeholderText">
            <span class="absolute top-1/2 transform -translate-y-2/4 right-3">
                <i class="fas fa-plus font-13"></i>
            </span>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="item in itemsList" :key="item.id" :value="item" v-slot="{ active, selected }">
                <li :class="[active ? 'bg-gray-300' : '', 'relative py-1.5 mx-1 cursor-default select-none border-b border-solid border-gray-300']">
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block']">
                        {{ item.name }}
                    </span>
                    <span v-if="selected" :class="[active ? 'text-yellow-500' : 'text-gray-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                        <i class="fas fa-check" />
                    </span>
                </li>
            </ListboxOption>
            </ListboxOptions>
        </transition>
    </Listbox>
</template>

<script>
    import { ref } from 'vue';
    import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';

    export default {
        components: { Listbox, ListboxButton, ListboxOptions, ListboxOption },
        props: {
            placeholderText: String,
            selectList: Array,
        },
        setup({ selectList }) {
            const itemsList = selectList;
            const selectedItem = ref([])
            return {
                itemsList,
                selectedItem,
            }
        }
    }
</script>