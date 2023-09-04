<script setup lang='ts' >
import { computed } from 'vue'
import TypographyInput from '@/components/TypographyInput.vue'
import Card from '@/components/Card.vue'
import BoardCard from '@/modules/board/components/BoardCard.vue'
import Draggable from 'vuedraggable'
import { useRoute } from 'vue-router'
import { IBoard } from '@/interfaces'

interface IBoardColumnProps {
  titleValue?: string;
  createValue?: string;
  onChangeTitle?: (value: string) => void;
  items: {id: number, title: string, cards: {}[]}
}

const route = useRoute()
const boardId: IBoard['id'] = route.params.boardId as IBoard['id'];

const props = defineProps<IBoardColumnProps>()
const emit = defineEmits(['update:titleValue', 'update:createValue'])

const titleValue = computed({
  get() {
    return props.titleValue
  },
  set(value) {
    emit('update:titleValue', value)
  }
})

const onBluerTitle = (prop) => {
  console.log('prop value', prop);
  console.log('props.titleValue', props.titleValue);
  console.log('titleValue', titleValue);
}

const cards = computed({
  get() {
    return props.items.cards;
  },
  set(value) {
    console.log('value', value);
  },
})

const title = computed({
  get() {
    return props.items.title
  },
  set(value) {
    console.log('value', value);
  },
})

</script>

<template>
  <Card class='board__column'>
    <div class='board__column-header'>
      <TypographyInput
        v-model='title'
        :onBlur='onBluerTitle'
        :placeholder='props.items.title'
        typography='title'
        variant='text'
      />
    </div>
    <Draggable
      v-model='cards'
      item-key='id'
      :group='boardId'
      class='board__column-main'
      tag='ul'
    >
      <template #item="{ element: card }">
        <li>
          <BoardCard :card='card'/>
        </li>
      </template>
    </Draggable>
    <div class='board__column-footer'>
      footer
    </div>
  </Card>
</template>

<style scoped>
.board__column {
  padding: 0 8px;
  margin: 0;
  height: auto;
  max-height: calc(100% - 4px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.board__column-main {
  overflow: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 100%;
  margin: 0;
  padding: 10px 0;
  gap: 12px;
}

</style>
