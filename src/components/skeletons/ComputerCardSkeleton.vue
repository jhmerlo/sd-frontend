<template>
  <q-card class="fit">
    <div class="absolute-top-right q-pa-sm text-caption text-grey-9 text-weight-bold">
      <q-skeleton type="rect" width="50px"/>
    </div>
    <div class="absolute-top-left q-pa-sm text-caption text-grey-9 text-weight-bold">
      <q-skeleton type="QChip" height="20px" width="100px" />
    </div>
    <q-card-section class="q-pb-none">
      <div class="text-primary row justify-center text-center q-mt-lg q-pt-sm">
        <q-skeleton type="rect" height="50px" width="70px" />
      </div>
      <div class="text-primary row justify-center text-center q-mt-md">
        <q-skeleton type="text" width="150px" />
      </div>
    </q-card-section>
    <q-card-section class="q-pt-md">
      <div v-for="j in 2" :key="j" class="q-mt-xs text-caption text-grey-9">
        <q-skeleton type="text" width="150px" />
      </div>
      <div class="q-mt-md text-caption text-grey-9">
        <q-skeleton type="text" width="100px" />
      </div>
      <div class="q-mt-xs text-caption text-grey-9">
        <q-skeleton type="text" width="100px" />
      </div>
    </q-card-section>
    <q-card-actions align="center" class="q-pt-md">
      <q-skeleton v-for="i in 4" :key="i" type="circle" class="q-ma-xs" size="40px" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'ComputerCardSkeleton'
}
</script>